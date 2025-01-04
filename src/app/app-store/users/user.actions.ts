// import { createActionGroup, emptyProps, props } from '@ngrx/store';
// import { UsersState } from './user.reducer';

// export const UserActions = createActionGroup({
//   source: 'User',
//   events: {
//     'Load Users':emptyProps(),
//     'Load Users Fail':emptyProps(),
//     'Load Users Success': emptyProps(),
//     'Loaded Users': props<{users:UsersState[]}>(),
    
    
//   }
// });

// import { createAction, props } from '@ngrx/store';
// import { User, UserState } from './user.reducer';

// export const loadUsers = createAction('[Users Resolver] Load Users');
// export const loadUsersSuccess = createAction('[Users API] Load Users Success', props<{ users: UserState[] }>());
// export const loadUsersFailure = createAction('[Users API] Load Users Failure', props<{ error: string }>());
