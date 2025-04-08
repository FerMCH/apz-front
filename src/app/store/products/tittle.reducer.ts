import { createReducer, on } from '@ngrx/store';
import { TittleActions } from './tittle.actions';

export const initialState: string = "";

export const TittleReducer = createReducer(
  initialState,
  on(TittleActions.updateLayout, (_state, {tittle}) => tittle)
);
