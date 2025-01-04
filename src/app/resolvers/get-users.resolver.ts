import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../providers/user.service';
import { UsersState } from '../app-store/users/user.reducer';
import { Store } from '@ngrx/store';
import { UserActions } from '../app-store/users/user.actions';
import { filter, first, tap } from 'rxjs/operators';

export const getUsersResolver: ResolveFn<UsersState[]> = (route, state) => {
  const store = inject(Store);
  debugger;
  return store.select((AppState)=>AppState.Users).pipe(
    tap((users) => {
      // if (!users.length) {
      debugger;
        store.dispatch(UserActions.loadUsers());
      // }
    }),
    filter((users) => {
      debugger;
      return !!users?.length;
    }),
    first() // Ensure the observable completes after the first emission with data
  );
  // store.dispatch(UserActions.loadUsers());
  // return inject(UserService).getUsers();
};
