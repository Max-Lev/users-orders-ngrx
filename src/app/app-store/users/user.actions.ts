import { createAction,props } from '@ngrx/store';
import { UsersLoadState } from './user.reducer';
import { User } from '../users-entity/user.model';

export const loadUsers = createAction('[Users Resolver] Load Users',props<{ usersLoadState: UsersLoadState }>());
export const loadUsersSuccess = createAction('[Users API] Load Users Success', props<{ usersLoadState: UsersLoadState }>());
export const loadUsersFailure = createAction('[Users API] Load Users Failure', props<{ error: string }>());
export const editUserName = createAction('Edit User Name', props<{ user:User }>());
