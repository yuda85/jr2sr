import { GlobalStateModel } from './global.model';
import { State, Action, StateContext } from '@ngxs/store';
import { SetJobs } from './global.actions';
import _ from 'lodash';

import { Injectable } from '@angular/core';

@Injectable()
@State<GlobalStateModel>({
  name: 'global',
  defaults: {
    companies: {},
    jobs: [],
  },
})
export class GlobalState {
  constructor() {}

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
