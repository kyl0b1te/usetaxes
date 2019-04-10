import { CreditModel } from '../shared/credit.model';
import * as AppActions from './app.actions';

export interface AppState {
  credits: State;
}

export interface State {
  credits: CreditModel[]
}

export const initialState: State = {
  credits: [
    new CreditModel(new Date(), 100),
    new CreditModel(new Date(), 350),
  ]
};

export function appReducer(
  state = initialState,
  action: AppActions.AppActions
) {
  switch (action.type) {
    case AppActions.AppActionTypes.ADD_CREDIT:
      return {
        ...state,
        credits: [ ...state.credits, action.payload ]
      };

    case AppActions.AppActionTypes.DELETE_CREDIT:
      const credits = [ ...state.credits ];
      credits.splice(action.payload, 1);
      return {
        ...state,
        credits
      };

    case AppActions.AppActionTypes.EDIT_CREDIT:
      const credit = state.credits[action.payload.index];
      const updated = { ...credit, ...action.payload.credit };
      const newCredits = [ ...state.credits ];
      newCredits[action.payload.index] = updated;
      return {
        ...state,
        credits: newCredits
      }
    default:
      return state;
  }
}
