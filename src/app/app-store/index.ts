import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { usersEntityAdapter, usersEntityReducer, UsersEntityState } from './user-entity/user-entity.reducer';
import { usersLoadReducer, UsersLoadState } from './users/user.reducer';
// import { userAdapter, UsersReducer, UsersState, UserState } from './users/user.reducer';
// import { userAdapter, userReducer, UserState } from './users/user.reducer';


export interface Order{
  id:number;
  userId:number;
  total:number;
}

// export const usersFeatureKey = 'users';

export interface AppState {
  usersLoadState:UsersLoadState;
  usersEntityState:UsersEntityState;
  // users:{
  //   enetities:{[id:number]:UserState};
  //   selectedUserId:number| null;
  // },
  // orders:{
  //   entities:{[id:number]:Order};
  // }

}

export const reducers: ActionReducerMap<AppState> = {

usersEntityState:usersEntityReducer,
usersLoadState:usersLoadReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

export const selectUserState = createFeatureSelector<UsersEntityState>('usersEntityState');

export const { selectAll: selectAllUsers } = usersEntityAdapter.getSelectors(selectUserState);
export const selectAllEntities = createSelector(
  selectUserState,
  (state) => {
    console.log(state)
    return state.entities;
  }
);

