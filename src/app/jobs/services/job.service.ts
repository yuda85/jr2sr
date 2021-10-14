import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { filter, finalize, map, take } from 'rxjs/operators';
import { IJob } from 'src/app/models';
import * as uuid from 'uuid';

const ddddd: Array<IJob> = [
  {
    id: '799d15b6-e7f3-435e-a0bd-615d899d33ef',
    title: 'Grizzly bear',
    description: 'Ursus arctos',
    requirements: null,
    salary: 14805,
    companyName: 'Domainer',
    area: 'Brandsen',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII=',
    category: 'complexity',
    hot: false,
    forStudents: true,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: '65dfb313-271f-4c81-ac96-c0adad0d366d',
    title: 'Spotted hyena',
    description: 'Crocuta crocuta',
    requirements: null,
    salary: 4004,
    companyName: 'Bigtax',
    area: 'Santa Rosa de Lima',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKmSURBVDjLjZPdS5NRHMf3D+h9XXVZRGBXBpYEdSGUaNkLoZWPmNNEI4tekMg0c+HKGLoldhFuBa2bKSm57WI2Wcryhfm4t/biptNRc29uzu2Z+/acU4+Y3njgy++cH+f7Ob/zJgIg2imTyVRkMBh6dTrdzMjIyG+NRhNRq9UOlUql+KBUnN49f7tjNpvzeLOcN2f8fj/C4TDi8TiSySRisRhsNisUfZ1cv7xD2SuT5P8H+Gf+6na7kcvlkEqlQCA+nw+hUAjZbBa57Aa4DQcM+o/ofvnQKOl6kr8NICsTcyaTAWkcx4GMXS4XotEohaY3VrCZsGJr8ye0o+/R/rRJSQG8+QRf9lYikaCG9fV1CgkEArDb7SD5bJZDMmZHOmGjVWR4tdyt37p/r7FIxJvlS0tLIHI4HNRE9kxAq6urtJ/ejPEAljf6+f4aX2EaRqMRYrFYLiooKMB+Rc6GgCORCDweDxiGmaMAlmXhdDoxMTGBwcFBOpnE5eVlmhdy5GC9Xi8WFxcRDAZRWVkZogAySTARCBHJCXkhmha8mGJdVHbfCi5UXFnbAyASzDsBZcxZtChuou51GW5IStCh7ERJ2SXrni0IIBKFLXS+fYxnnxl8Yfswt6JFj+42rvYcwynmqGVfh1j1/AyG5t9gyCqjVyzV30KPXozCxgNp+pBkMpl8fHwcwSh/lQELrL5ZzHt+YNY5hWm7Cedbj2OUfYedbdjSRwB/37NUKs3reNGu/zSsgueXjUIIYMY5iWnHdxTfOYRubQ26tNXU3DVWLVSQ2v5MbW1teY9aHww0NNdxmjE1Jue/UYjFbUbrQD0qpIfxSltLVyaRjHmAVLT7ezY3N52sa6jtv15TxV6+djFcXlEaLi0/xxYzR2YLGw8mSdm84rwkZP4fYOfdUwjREaAAAAAASUVORK5CYII=',
    category: 'client-driven',
    hot: true,
    forStudents: false,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: 'b24c43a6-d51e-481b-96a1-06b7303ef442',
    title: 'Cardinal, red-capped',
    description: 'Paroaria gularis',
    requirements: null,
    salary: 13199,
    companyName: 'Treeflex',
    area: 'Peuhaq',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKVSURBVDjLZZJPaFRXFIe/92aSyYyTZGL9lygxcYwBi1hcqQtRIYoobtpNaVcVLIHArIKb4EJEwazEveAiQSq4EASzcCOiICqCDjHRWFQsmAYyZjIzzrv3nNPFs/EZDxzu3ZyP3/nuDcyMZE1OTuZVdVRE9onIWhHBOdflnNtdKpWWWVVBEjAxMfGTqt7s6enp7+joIAxDVJWZmRnm5+dr3vtdpbtnRgGXmbISQDoxnBeRG8VisT+KIqanp6nVaogIZsZAunH1yNTYXWADcOL/uRWAiAx3d3dvd84xOzv7xnt/WET+ERF+vXdxuKu+MA68AjZlpmz5O4D3fl8ul2Nubg7n3ImRkZG3AM2jwXHgEnD1ytD45Xw+f3vh/HkbGxs7uBqwPgxDqtUq3vu/E54+AL9f2Hv2VrC83Ozs7KRerz/6RuK7+3/Yw7lBPn7KIiKc/PExKXOYeMzH7Zxw7dkeVJWNbYsc3/yYwdNPgziBGb/8fIiAkCCVJeAYaADpNsBAHOKrnBuqgToAXl9/8NWBiQcMv/AX6cw6giAP2gLZAphC/ROy9Iqo8QH1dbL9I1jUTAC8BzWQiEr5CWG4hsLO/by/M47pBnoPDFF5WSZqLNLe14WZYC5KAhyYYeIoDO4gbF0HgSJN4flCll4iCsV+PtcymK+D6QogBDDnMBMQx+KLZ1TKjyD06Gel2WiCRVRmpqnMvovXVcWcSyRwLqZKRGGgj1TuBwgjtv32J9uch6WPdBZ7aF1qiROorQZEoIr6iEq5TCrXDm15SLeCeliq0Fj8F1er0t7bgaHx2kmAmZDZcors1hRBayZ+wrAFVCBq0N6oIq6JqcS+vE8AoiZvbo7GLrzHvPvSfuVEJP5YIvFdBYD/ALt6pUq4OEUGAAAAAElFTkSuQmCC',
    category: 'transitional',
    hot: false,
    forStudents: true,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: '3ee593fa-01fb-467d-8aea-87f91d99f6da',
    title: 'Teal, hottentot',
    description: 'Anas punctata',
    requirements: null,
    salary: 13008,
    companyName: 'Alpha',
    area: 'Tangdong',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADrSURBVDjLY/z//z8DJYCJgUIwyAwoPZHJBsS7STGABY1/9e+fvzKkGMAIiwWgzRfF2ST0/vz5w/Dw/UOGXz9/M/z6AcK/GH4CMZj+jmCD5C70X2VkgWo+KcYqrqfArcTw598fBhluOTD9++9fIP7N8PsfEP/9AxUD0b8ZVq9ci/AC0Nm//zD+Yfj19xdY0R+got9gxb8RNNQAkNyf/0CxX39QvZC5M+68MJuIAQczJ8PDlw8ZXr9/g9XZIK+BNP/5/Yfh/sJHjIzIKTF2VchNoEI5oAbHDWk7TpAcjUDNukDNB4nVjOKFEZwXAOOhu7x6WtPJAAAAAElFTkSuQmCC',
    category: 'hub',
    hot: true,
    forStudents: false,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: '1ede8b03-ccba-4b81-aed0-73527f456a30',
    title: 'Elk, Wapiti',
    description: 'Cervus canadensis',
    requirements: null,
    salary: 6810,
    companyName: 'Kanlam',
    area: 'Llipa',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHtSURBVDjLpVPJqiJBEHwf1f/UH+DydBTtLxBRUAS9eFH04MGTINIHUQQRt3I5eHBfW20XFBVzKgq75TGPNwxTEFSTXREZmVn1QUQf/4M/Av1+X+r1ekq321U7nY7GGNNarZbabDaVer0u/SjAyTIns/V6TefzmR6Ph8DpdKLFYkG1Wo1Vq1X5W4EXWb9er4SF/XA4kK7rdLlcRAyilUpFL5fL8heBl21mkHe7HW23W1ouV7Tf72mz2RBcGSKqqrJCoSCZArxexThgkEejMbndbrLb7S+xpQDWYDCgbDarmAK8WSqUYVXTNJrNZoJos9nJ6fzFd5uIow/oBwTT6bRqCrTbbQ3Ngl0c/Px0CDKIgMPhJKvVKsqAi9vtRolEQjMF+JiEAOzj0Gq1Mi0jKxxNp1MBw0U8Hn8LNBoNFR1HGSAhKzICFotFwOVy0WQyEZMZDocUi8XeJfD5Kvj5fD5FBq/XS4qikMfjMXfERqMR3e93KpVKFIlE3k3kc5WKxSJDD7AMuxAdj8eCiKxIgG9OZhzSl4uUz+flXC6nY+Y4eDwehZv5fC4uEzJDhBP1YDAof3uVM5mMnEqlGC9JNA49Qc2YO788xInM7/fLPz6mZDIpRaNRJRwOq6FQSAsEAhonqT6fT+Hf0l9f47/iN5+1McdPrPQwAAAAAElFTkSuQmCC',
    category: 'Optimized',
    hot: true,
    forStudents: true,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: '4da257c5-5666-4232-b216-40e494231012',
    title: 'Red phalarope',
    description: 'Phalaropus fulicarius',
    requirements: null,
    salary: 7265,
    companyName: 'Fixflex',
    area: 'Sembungan Kidul',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGKSURBVCjPPVFNSwJRFH1SPyR00V+xIqJVREIEUm6VFm1ahFvLiiI/oE1QRlQgUtgHlKhp41dlokVFpKmjo41M69MZlbi8d+Gec8897z4BoYcwREdj67fJsHqunkp728cjvToR/UoYs66I9og6OvjEA0o41FzeXWOfkB+6CZQIqajhGz/MRWQRh+dg3USCMNyvvbG3xVDQ5JFRJkXFNZZ8JNyZw1qbfTrUZuhwk1mihktbGRNxd45QqxvtroqMBip4pZcYHB4Rkhr44oh2H9bzJ/srHBLEYkoE1RZF5X8PLZ4qnmm3SqsOlQSpC1X6KhU+ssacwxlvW0ccSWnObOCdkK7ygUcSmijQ5BNsKeH1FMnOkK2wWOCtII9LDlCxBeuWCJh3tTynKVRJItG1meUOyqTMaTMT3KTTdwUNUYa+i3uCMvcSgR+2VTFAwo5xcz/EV6dps06VKLu/EMDUyeRw/7NcRoffqcXp+4I2X+DB9K/VbTH9/6Yey6MLfrtkV62d2cz8hmVcDPbqfy6NlFRFHkA7AAAAAElFTkSuQmCC',
    category: 'reciprocal',
    hot: false,
    forStudents: false,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: 'e9ba8c7d-824b-4249-8d7a-7c26743b53df',
    title: 'Collared lizard',
    description: 'Crotaphytus collaris',
    requirements: null,
    salary: 12759,
    companyName: 'Alpha',
    area: 'Mangusu',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg==',
    category: 'info-mediaries',
    hot: false,
    forStudents: false,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: '87caa442-9b17-477c-8c77-40e1f812dddd',
    title: 'Swan, black',
    description: 'Cygnus atratus',
    requirements: null,
    salary: 4346,
    companyName: 'Wrapsafe',
    area: 'Prokhladnyy',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAINSURBVBgZBcG/r55zGAfg6/4+z3va01NHlYgzEfE7MdCIGISFgS4Gk8ViYyM2Mdlsko4GSf8Do0FLRCIkghhYJA3aVBtEz3nP89wf11VJvPDepdd390+8Nso5nESBQoq0pfvXm9fzWf19453LF85vASqJlz748vInb517dIw6EyYBIIG49u+xi9/c9MdvR//99MPPZ7+4cP4IZhhTPbwzT2d+vGoaVRRp1rRliVvHq+cfvM3TD82+7mun0o/ceO7NT+/4/KOXjwZU1ekk0840bAZzMQ2mooqh0A72d5x/6sB9D5zYnff3PoYBoWBgFKPKqDKqjCpjKr//dcu9p489dra88cydps30KswACfNEKanSaxhlntjJ8Mv12Paie+vZ+0+oeSwwQ0Iw1xAR1CiFNJkGO4wu3ZMY1AAzBI0qSgmCNJsJUEOtJSMaCTBDLyQ0CknAGOgyTyFFiLI2awMzdEcSQgSAAKVUmAeNkxvWJWCGtVlDmgYQ0GFtgg4pNtOwbBcwQy/Rife/2yrRRVI0qYCEBly8Z+P4qMEMy7JaVw72N568e+iwhrXoECQkfH91kY7jwwXMsBx1L93ZruqrK6uuiAIdSnTIKKPLPFcvay8ww/Hh+ufeznTXu49v95IMoQG3784gYXdTqvRmqn/Wpa/ADFX58MW3L71SVU9ETgEIQQQIOOzub+fhIvwPRDgeVjWDahIAAAAASUVORK5CYII=',
    category: 'Graphical User Interface',
    hot: false,
    forStudents: true,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: 'fb93b4d4-2a2c-41c2-a7eb-910e000f89bc',
    title: 'Eleven-banded armadillo (unidentified)',
    description: 'Cabassous sp.',
    requirements: null,
    salary: 9928,
    companyName: 'Zathin',
    area: 'Puutura',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJeSURBVDjLhZNdSFNhGMc3z9lUREVnGmgzEZa7kGBe6kWYg26syz7uoqKgEOpiUjfdjALJiwmDYKSMburm7EInG8yNttm+UitwQm26sVgrcSPWvtf5977HbSyc9sB/73ne53l+7//snCMCIKIiIVYqlVM6nc6vUCgukZylexWxKpVqwmAweGgP3avN0Z8QWTxEAbMZ8XgcvuVlIQ9VRK83LRahtrG6WqtVDhaJafK5uRlBtxuxWAzbZP3IMDhoahK0JRYjuL4u1GjPVgVQcXcI+NLWBs5oRCQSAbe0hM2eHkS7uxHt6MCH1lZwi4uHNbLuNALsd3ZibWQELwcGYBscRFgux15/P3Z7e7FDQOb2diy0tGBFKkWcODoCSMtk+DE+jsTYGL6PjiJGYNHhYewRUJiAQn19+Epchbq6cMCy/wJ8Ph/K5fKxKpVKyOVygmjQPTpzLCCTySAQCCCZTMLv98Pj8cBCngINnuf/D6DDJpNJOLlQKCCRSMDpdAp5sVhEPp+H1+s9CqANVQjHcbVmm82G7dfP8f6mEraLEjiuyfFu7n5jQFVVAD3d8eIhPmkmkDPPgw9akHnzCIEH52GdZGdOBFD7drsd9utnkSXDWJgGZruAZ0PYn7sA6xSzK7zKFECG/tQDqKj9dDot2OY3ONRH6ulp2CZZXgDQe0ylUr8opP7PpA6y2SwcV8/g96tbABnKa0RIEkXvMbCqmW8CQK/Xw+FwwOVyNdb8DHx3ziE+O4SfjyUI3xZj7bIUFjXzRABotVo3+Yxxkt5qbmDlyiliWwLztAzGu+oUnf0LtxKkWPCjmmgAAAAASUVORK5CYII=',
    category: 'migration',
    hot: false,
    forStudents: false,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
  },
  {
    id: 'ebf98522-43d8-4322-8f46-5cff6ffefd8d',
    title: "Squirrel, smith's bush",
    description: 'Paraxerus cepapi',
    requirements: null,
    salary: 10254,
    companyName: 'Asoka',
    area: 'Pereira',
    category: 'optimizing',
    hot: false,
    forStudents: false,
    timestamp: new Date().getTime(),
    companyId: 'asdasd',
    imageUrl: 'https://source.unsplash.com/user/erondu/1600x900',
    companyImageUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJeSURBVDjLhZNdSFNhGMc3z9lUREVnGmgzEZa7kGBe6kWYg26syz7uoqKgEOpiUjfdjALJiwmDYKSMburm7EInG8yNttm+UitwQm26sVgrcSPWvtf5977HbSyc9sB/73ne53l+7//snCMCIKIiIVYqlVM6nc6vUCgukZylexWxKpVqwmAweGgP3avN0Z8QWTxEAbMZ8XgcvuVlIQ9VRK83LRahtrG6WqtVDhaJafK5uRlBtxuxWAzbZP3IMDhoahK0JRYjuL4u1GjPVgVQcXcI+NLWBs5oRCQSAbe0hM2eHkS7uxHt6MCH1lZwi4uHNbLuNALsd3ZibWQELwcGYBscRFgux15/P3Z7e7FDQOb2diy0tGBFKkWcODoCSMtk+DE+jsTYGL6PjiJGYNHhYewRUJiAQn19+Epchbq6cMCy/wJ8Ph/K5fKxKpVKyOVygmjQPTpzLCCTySAQCCCZTMLv98Pj8cBCngINnuf/D6DDJpNJOLlQKCCRSMDpdAp5sVhEPp+H1+s9CqANVQjHcbVmm82G7dfP8f6mEraLEjiuyfFu7n5jQFVVAD3d8eIhPmkmkDPPgw9akHnzCIEH52GdZGdOBFD7drsd9utnkSXDWJgGZruAZ0PYn7sA6xSzK7zKFECG/tQDqKj9dDot2OY3ONRH6ulp2CZZXgDQe0ylUr8opP7PpA6y2SwcV8/g96tbABnKa0RIEkXvMbCqmW8CQK/Xw+FwwOVyNdb8DHx3ziE+O4SfjyUI3xZj7bIUFjXzRABotVo3+Yxxkt5qbmDlyiliWwLztAzGu+oUnf0LtxKkWPCjmmgAAAAASUVORK5CYII=',
  },
];

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private uploadPercent: any;
  private downloadURL: any;

  constructor(
    private _db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    // ddddd.forEach((job) => {
    //   this.addNewJob(job, 'PdNWzMJsipU90KYUVEqQGgyFMQz2');
    // });
  }

  /**
   * fetchJobs
   * getJobs
   * addNewJob // https://stackoverflow.com/questions/49026589/angular-firestore-where-query-returning-error-property-does-not-exist-on
   * edit job
   * remove job
   * ApplyToJob
   * getJobById
   * GetJobsByCategoryId
   * searchJobs
   * saveJob
   */

  public fetchJobs(): Observable<Array<IJob>> {
    return this._db
      .collection('jobs', (ref) => ref.limit(10).startAt(10))
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            const data = doc.payload.doc.data() as IJob;
            return { ...data, id: doc.payload.doc.id };
          });
        })
      );
  }

  public addNewJob(job: IJob, userId: string): void {
    this._db.collection('jobs').add(<IJob>{ ...job, uploadingUserId: userId });
  }

  public uploadFile(event: any, jobId: string, docId: string) {
    const file = event.target.files[0];
    const fileId = uuid.v4();
    const filePath = `/${jobId}/${fileId}`;

    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef
            .getDownloadURL()
            .pipe(
              filter((data) => !!data),
              take(1)
            )
            .subscribe((fileUrl) => {
              this._db
                .collection('jobs')
                .doc(jobId)
                .update({ fileUrl: fileUrl });
            });
        })
      )
      .subscribe();

    this._db
      .collection('jobs')
      .doc(jobId)
      .update({ file: file.name, fileId: fileId });
  }

  nameValue: string;
  placeValue: string;

  //Data object for listing items
  tableData: any[] = [];

  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count = 0;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;

  loadItems() {
    this._db
      .collection('jobs', (ref) => ref.limit(5))
      .snapshotChanges()
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (!response.length) {
            console.log('No Data Available');
            return false;
          }
          this.firstInResponse = response[0].payload.doc;
          this.lastInResponse = response[response.length - 1].payload.doc;

          this.tableData = [];
          for (let item of response) {
            this.tableData.push(item.payload.doc.data());
          }

          //Initialize values
          this.prev_strt_at = [];
          this.pagination_clicked_count = 0;
          this.disable_next = false;
          this.disable_prev = false;

          //Push first item to use for Previous action
          this.push_prev_startAt(this.firstInResponse);
        },
        (error) => {}
      );
  }

  nextPage() {
    this.disable_next = true;
    this._db
      .collection('jobs', (ref) => ref.limit(5).startAfter(this.lastInResponse))
      .get()
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe(
        (response) => {
          console.log('response :>> ', response);
          if (!response.docs.length) {
            this.disable_next = true;
            return;
          }

          this.firstInResponse = response.docs[0];

          this.lastInResponse = response.docs[response.docs.length - 1];
          this.tableData = [];
          for (let item of response.docs) {
            this.tableData.push(item.data());
            console.log(item.data());
          }

          this.pagination_clicked_count++;

          this.push_prev_startAt(this.firstInResponse);

          this.disable_next = false;
        },
        (error) => {
          this.disable_next = false;
        }
      );
  }

  push_prev_startAt(prev_first_doc) {
    this.prev_strt_at.push(prev_first_doc);
  }
}
