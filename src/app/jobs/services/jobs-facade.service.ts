import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IJob } from 'src/app/models';
import { GlobalStateSelectors } from 'src/app/state/global/global.selectors';
import { JobService } from './job.service';

@Injectable({
  providedIn: 'root',
})
export class JobsFacadeService {
  constructor(private store: Store, private jobService: JobService) {}

  public getJobs(): Observable<Array<IJob>> {
    return this.store.select(GlobalStateSelectors.jobs);
  }

  public nextPage(): void {
    this.jobService.nextPage();
  }
}
