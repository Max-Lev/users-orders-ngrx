import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { UsersReducer, UsersState } from './users/user.reducer';


export interface Order{
  id:number;
  userId:number;
  total:number;
}

export const usersFeatureKey = 'users';

export interface AppState {
  users:UsersState
  // users:{
  //   enetities:{[id:number]:UserState};
  //   selectedUserId:number| null;
  // },
  // orders:{
  //   entities:{[id:number]:Order};
  // }

}

export const reducers: ActionReducerMap<AppState> = {
users:UsersReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
