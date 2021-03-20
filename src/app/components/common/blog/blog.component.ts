import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  blogSlides: OwlOptions = {
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    rtl: true,
    margin: 30,
    navText: [
      "<i class='bx bx-right-arrow-alt'></i>",
      "<i class='bx bx-left-arrow-alt'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  };
}
