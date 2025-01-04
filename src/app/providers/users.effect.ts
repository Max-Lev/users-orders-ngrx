
// import { createAction, props } from '@ngrx/store';

// export const loadUsers = createAction('[Users Resolver] Load Users');
// export const loadUsersSuccess = createAction('[Users API] Load Users Success', props<{ users: UsersState[] }>());
// export const loadUsersFailure = createAction('[Users API] Load Users Failure', props<{ error: string }>());

// import { Injectable } from '@angular/core';
// import { Actions, ofType, createEffect } from '@ngrx/effects';

// // import * as UserActions from './../app-store/users/user.actions';
// import { catchError, map, mergeMap, tap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { UserService } from './user.service';
// import { UserActions } from '../app-store/user-entity/user.actions';
// import { UsersState } from '../app-store/user-entity/user.reducer';
// // import { UserState } from '../app-store/users/user.reducer';

// @Injectable({providedIn:'root'})
// export class UserEffects {
//   constructor(private actions$: Actions, private userService: UserService) {
    
//   }

//   loadUsers$ = createEffect(() =>
//     this.actions$.pipe(
//       tap(()=>{
//         console.log('UserEffects')
//       }),
//       ofType(UserActions.loadUsers), // Triggered by loadUsers action
//       mergeMap(() =>
//       {
//         debugger;
//         return this.userService.getUsers().pipe(
//           tap(()=>{
//             console.log('users')
//           }),
//           map((users) => {
//             console.log(users);
//             return UserActions.loadUsersSuccess({ users });
//           }),
//           catchError((error) => of(UserActions.loadUsersFail({ error: error.message })))
//         )
//       })
//     )
//   );
// }


// import { inject, Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, EMPTY, map, mergeMap } from 'rxjs';
// import { UserService } from './user.service';
// import { UserActions } from '../app-store/users/user.actions';
// import { UsersState } from '../app-store/users/user.reducer';

// @Injectable()
// export class UsersEffects {

//   userService = inject(UserService);
//   private actions$ = inject(Actions);
  
//   constructor() { }


//    getUsers = createEffect(() =>
//     this.actions$.pipe(
//       ofType(UserActions.loadUsers), // Triggered by the loadUsers action
//       mergeMap(() =>
//         this.userService.getUsers().pipe(
//           map((data: UsersState[]) => {
//             debugger;
//             return UserActions.loadedUsers({ users: data }); // Dispatch success action with data
//           }),
//           catchError(() => {
//             UserActions.loadUsersFail();
//             console.error('Error loading users');
//             return EMPTY; // Optionally, dispatch a failure action instead
//           })
//         )
//       )
//     )
//   );

// }
