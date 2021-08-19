import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IJob } from 'src/app/models';
import { GlobalStateSelectors } from 'src/app/state/global/global.selectors';

@Injectable({
  providedIn: 'root',
})
export class JobsFacadeService {
  constructor(private store: Store) {}

  public getJobs(): Observable<Array<IJob>> {
    return this.store.select(GlobalStateSelectors.jobs);
  }
}
