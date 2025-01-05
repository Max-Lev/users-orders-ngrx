import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../providers/user.service';
import { UserActions } from '../app-store/user-entity/user-entity.actions';
import { selectAllUsers } from '../app-store';
import { User } from '../app-store/user-entity/user.model';
import { loadUsersFailure, loadUsersSuccess } from '../app-store/users/user.actions';

@Injectable({ providedIn: 'root' })
export class UsersResolver {

  readonly store = inject(Store);
  readonly userService = inject(UserService);

  resolve(): Observable<User[]> {
    return this.store.select(selectAllUsers).pipe(
      first(), // Take the current state of the users
      switchMap((users) => {
        if (users.length) {
          debugger
          // If users already exist in the store, do nothing
          return of();
        }
        // If users are empty, fetch from the API
        return this.userService.getUsers().pipe(
          tap((fetchedUsers) => {
            this.store.dispatch(loadUsersSuccess({ usersLoadState: { loadingSuccess: true, errorMsg: null } }));
            this.store.dispatch(UserActions.loadUsers({ users: fetchedUsers }));
          }),
          catchError((error) => {
            console.error('Error fetching users:', error);
            this.store.dispatch(loadUsersFailure({ error }));
            return of();
          })
        );
      })
    );
  }
}



