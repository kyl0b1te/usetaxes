import { CreditModel } from '../shared/credit.model';
import * as AppActions from './app.actions';
import { AmountModel } from '../shared/amount.model';

export interface AppState {
  credits: State;
}

export interface State {
  credits: CreditModel[],
  total: {
    credit: AmountModel,
    tax: AmountModel,
    profit: AmountModel
  }
}

export const initialState: State = {
  credits: [ ],
  total: {
    credit: new AmountModel(0, 'UAH'),
    tax: new AmountModel(0, 'UAH'),
    profit: new AmountModel(0, 'UAH'),
  }
};

const round = (value: number): number => {
  return Math.round(value * 100) / 100;
}

const getTotal = (credits: CreditModel[]): { credit: AmountModel, tax: AmountModel, profit: AmountModel } => {
  let totalCredit = 0;
  for (const credit of credits) {
    totalCredit += credit.national.amount;
  }
  const tax = totalCredit * 0.05;

  return {
    credit: new AmountModel(round(totalCredit), 'UAH'),
    tax: new AmountModel(round(tax), 'UAH'),
    profit: new AmountModel(round(totalCredit - tax), 'UAH'),
  }
};

export function appReducer(
  state = initialState,
  action: AppActions.AppActions
) {
  switch (action.type) {
    case AppActions.AppActionTypes.ADD_CREDIT:
      const addedCredits = [ ...state.credits, action.payload ]
      return {
        ...state,
        credits: addedCredits,
        total: getTotal(addedCredits)
      };

    case AppActions.AppActionTypes.DELETE_CREDIT:
      const deletedCredits = [ ...state.credits ];
      deletedCredits.splice(action.payload, 1);
      return {
        ...state,
        credits: deletedCredits,
        total: getTotal(deletedCredits)
      };

    case AppActions.AppActionTypes.EDIT_CREDIT:
      const editableCredit = state.credits[action.payload.index];
      const editedCredit = { ...editableCredit, ...action.payload.credit };
      const editedCredits = [ ...state.credits ];
      editedCredits[action.payload.index] = editedCredit;
      return {
        ...state,
        credits: editedCredits,
        total: getTotal(editedCredits)
      }
    default:
      return state;
  }
}
