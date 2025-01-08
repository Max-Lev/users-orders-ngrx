

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { UserActions } from '../app-store/users-entity/users-entity.actions';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {

  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers), // Triggered by loadUsers action
      mergeMap(() => {
        return this.userService.getUsers().pipe(
          map((users) => {
            console.log('effect',users);
            return UserActions.loadUsersSuccess({ users });
          }),
          catchError((error) => of(UserActions.loadUsersFail({ error: error.message })))
        )
      })
    )
  );
}


