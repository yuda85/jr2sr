import { GlobalStateModel } from './global.model';
import { State, Action, StateContext } from '@ngxs/store';
import { AddJobs, SetJobs } from './global.actions';
import _ from 'lodash';

import { Injectable } from '@angular/core';
import { JobService } from 'src/app/jobs/services/job.service';

@Injectable()
@State<GlobalStateModel>({
  name: 'global',
  defaults: {
    companies: {},
    jobs: [],
  },
})
export class GlobalState {
  constructor(private jobsService: JobService) {}

  ngxsOnInit(ctx: StateContext<GlobalStateModel>) {
    this.jobsService.fetchJobs().subscribe((data) => {
      ctx.patchState({ jobs: data });
    });
  }

  @Action(SetJobs)
  setJobs(ctx: StateContext<GlobalStateModel>, action: SetJobs) {
    const currentJobs = ctx.getState().jobs;
    ctx.patchState({ jobs: [...currentJobs, ...action.payload] });
  }

  @Action(AddJobs)
  addJobs(ctx: StateContext<GlobalStateModel>, action: SetJobs) {
    const currentJobs = ctx.getState().jobs;
    const finalJobs = _.uniq([...currentJobs, ...action.payload], 'id');
    ctx.patchState({ jobs: finalJobs });
  }
}
