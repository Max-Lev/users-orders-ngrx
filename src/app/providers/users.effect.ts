import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { UserService } from './user.service';
import { UserActions } from '../app-store/users/user.actions';
import { UsersState } from '../app-store/users/user.reducer';

@Injectable()
export class UsersEffects {

  userService = inject(UserService);
  private actions$ = inject(Actions);
  
  constructor() { }


   getUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers), // Triggered by the loadUsers action
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((data: UsersState[]) => {
            debugger;
            return UserActions.loadedUsers({ users: data }); // Dispatch success action with data
          }),
          catchError(() => {
            UserActions.loadUsersFail();
            console.error('Error loading users');
            return EMPTY; // Optionally, dispatch a failure action instead
          })
        )
      )
    )
  );

  // getUsers = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.loadUsersSuccess),
  //     mergeMap(() => {
  //       this.userService.getUsers().pipe(
  //         map(data => {
  //           console.log(data)
  //           return UserActions.loadedUsers({users:data})
  //         }),
  //         catchError(() => EMPTY)
  //       )

  //     })
  //   )
  // );

}
