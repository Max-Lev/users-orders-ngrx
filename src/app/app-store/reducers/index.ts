import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

// export interface User{
//   id:number;
//   name:string;
// }
export interface Order{
  id:number;
  userId:number;
  total:number;
}

export const usersFeatureKey = 'users';

export interface AppState {
  users:{
    enetities:{[id:number]:User};
    selectedUserId:number| null;
  },
  orders:{
    entities:{[id:number]:Order};
  }

}

export const reducers: ActionReducerMap<AppState> = {

};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
