import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IJob } from '../../models';
import { JobsFacadeService } from '../services/jobs-facade.service';

@Component({
  selector: 'app-jobs-container',
  templateUrl: './jobs-container.component.html',
  styleUrls: ['./jobs-container.component.scss'],
})
export class JobsContainerComponent implements OnInit {
  public jobs$: Observable<Array<IJob>>;

  constructor(private jobsFacade: JobsFacadeService) {}

  ngOnInit(): void {
    this.jobs$ = this.jobsFacade.getJobs();
  }

  onScroll() {
    console.log('scrolled!!');
    this.jobsFacade.nextPage();
  }
}
