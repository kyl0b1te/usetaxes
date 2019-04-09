import { Action } from '@ngrx/store';
import { CreditModel } from '../shared/credit.model';

export enum AppActionTypes {
  ADD_CREDIT = 'ADD_CREDIT',
  DELETE_CREDIT = 'DELETE_CREDIT',
  EDIT_CREDIT = 'EDIT_CREDIT'
};

export class AddCredit implements Action {
  readonly type = AppActionTypes.ADD_CREDIT;
  constructor(public payload: CreditModel) { }
}

export class DeleteCredit implements Action {
  readonly type = AppActionTypes.DELETE_CREDIT;
  constructor(public payload: number) { }
}

export class EditCredit implements Action {
  readonly type = AppActionTypes.EDIT_CREDIT;
  constructor(public payload: { index: number, credit: CreditModel }) { }
}

export type AppActions = AddCredit | DeleteCredit | EditCredit;
