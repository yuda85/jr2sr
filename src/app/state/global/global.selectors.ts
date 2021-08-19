import { Selector, createSelector } from '@ngxs/store';
import { GlobalState } from './global.state';
import { GlobalStateModel } from './global.model';

export class GlobalStateSelectors {
  @Selector([GlobalState])
  static companies(state: GlobalStateModel) {
    return state.companies;
  }

  @Selector([GlobalState])
  static jobs(state: GlobalStateModel) {
    return state.jobs;
  }

  // public static systemButtonState(
  //   key: SystemCommandTypes
  // ): (state: GlobalStateModel) => boolean {
  //   return createSelector(
  //     [GlobalState],
  //     (state: GlobalStateModel) =>
  //       state.SystemCommands.find((item) => item.ButtonName === key).State
  //   );
  // }
}
