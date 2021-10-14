import { GlobalStateModel } from './global.model';
import { State, Action, StateContext } from '@ngxs/store';
import { SetJobs } from './global.actions';
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
    // this.jobsService.fetchJobs().subscribe((data) => {
    //   ctx.patchState({ jobs: data });
    //   console.log(data);
    // });

    this.jobsService.loadItems();
    setTimeout(() => {
      this.jobsService.nextPage();
    }, 3000);
  }

  @Action(SetJobs)
  setEnums(ctx: StateContext<GlobalStateModel>, action: SetJobs) {
    ctx.patchState({ jobs: action.payload });
    // const data = action.payload;
    // const updatedConfiguration = ctx.getState().Configuration || {
    //   Enums: null,
    // };
    // updatedConfiguration.Enums = data;
    // ctx.patchState({ Configuration: updatedConfiguration });
  }
}
