import { createAction,props } from '@ngrx/store';
import { UsersLoadState } from './user.reducer';

export const loadUsers = createAction('[Users Resolver] Load Users',props<{ usersLoadState: UsersLoadState }>());
export const loadUsersSuccess = createAction('[Users API] Load Users Success', props<{ usersLoadState: UsersLoadState }>());
export const loadUsersFailure = createAction('[Users API] Load Users Failure', props<{ error: string }>());

