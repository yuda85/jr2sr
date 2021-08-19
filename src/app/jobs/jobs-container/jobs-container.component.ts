import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IJob } from '../../models';


@Component({
  selector: 'app-jobs-container',
  templateUrl: './jobs-container.component.html',
  styleUrls: ['./jobs-container.component.scss']
})
export class JobsContainerComponent implements OnInit {

  public jobs$: Observable<Array<IJob>>

  constructor() { }

  ngOnInit(): void {
  }

}
