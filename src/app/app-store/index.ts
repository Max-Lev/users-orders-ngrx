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

export const selectUserEntitiesState = createFeatureSelector<UsersEntityState>('usersEntityState');

// export const { selectAll: selectAllUsers } = usersEntityAdapter.getSelectors(selectUserEntitiesState);

export const selectAllEntities = createSelector(
  selectUserEntitiesState,
  (state) => {
    console.log(state)
    return state.entities;
  }
);
export const {
  selectAll, // Returns all entities as an array
  selectEntities, // Returns entities as a dictionary (key-value pair)
  selectIds, // Returns the array of IDs
  selectTotal, // Returns the total count of entities
} = usersEntityAdapter.getSelectors(selectUserEntitiesState); // Replace `selectUserState` with the feature selector

