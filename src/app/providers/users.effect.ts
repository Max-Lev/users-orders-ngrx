

import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { UserActions } from '../app-store/users-entity/users-entity.actions';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  actions$ = inject(Actions);
  userService = inject(UserService);

  selectUser$ = createEffect(() => this.actions$.pipe(
    debounceTime(1000),
    ofType(UserActions.selectedUser),
    switchMap((action) => {
      if(action.user===null){
        return of();
      }
      return this.userService.getUser$(action.user!.id).pipe(
        map((users) => UserActions.loadUsersSuccess({ users })),
        catchError((error) => of(UserActions.loadUsersFail({ error: error.message }))))
    })
  ));

}



