import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { usersAdapter, usersReducer, UsersState } from './user-entity/user.reducer';
// import { userAdapter, UsersReducer, UsersState, UserState } from './users/user.reducer';
// import { userAdapter, userReducer, UserState } from './users/user.reducer';


export interface Order{
  id:number;
  userId:number;
  total:number;
}

// export const usersFeatureKey = 'users';

export interface AppState {
  users:UsersState;
  // users:{
  //   enetities:{[id:number]:UserState};
  //   selectedUserId:number| null;
  // },
  // orders:{
  //   entities:{[id:number]:Order};
  // }

}

export const reducers: ActionReducerMap<AppState> = {

users:usersReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

export const selectUserState = createFeatureSelector<UsersState>('users');

export const { selectAll: selectAllUsers } = usersAdapter.getSelectors(selectUserState);
// export const selectLoading = createSelector(selectUserState, (state) => state.entities);
export const selectAllEntities = createSelector(
  selectUserState,
  (state) => state.entities
);

