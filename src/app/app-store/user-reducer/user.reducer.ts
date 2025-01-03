import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface User {
  id: number;
  name: string;
}

export const initialState: User = {

};

export const reducer = createReducer(
  initialState,
);

