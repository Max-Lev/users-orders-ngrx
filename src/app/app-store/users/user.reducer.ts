import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
export * as UserAction from './user.actions';
export const userFeatureKey = 'user';

export interface UsersState {
  id: number;
  name: string;
}

export const initialState: UsersState = {
id:-1,
name:'',
};

export const UsersReducer = createReducer(
  initialState,
  on(UserActions.loadUsers,(state,action)=>{
    console.log(UserActions.loadUsers,state)
    return state = {...state}
  }),
  on(UserActions.loadUsersFail,(state,action)=>{
    console.log(UserActions.loadUsersFail,state)
    return state;
  }),
  on(UserActions.loadUsersSuccess,(state,action)=>{
    debugger;
    console.log(UserActions.loadUsersSuccess,state)
    return state;
  }),
  on(UserActions.loadedUsers,(state,action)=>{
    debugger;
    console.log(UserActions.loadedUsers,state)
    return state;
  }),
);

