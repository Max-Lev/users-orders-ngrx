import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../providers/user.service';
import { UserActions } from '../app-store/user-entity/user.actions';
import { selectAllUsers } from '../app-store';
import { User } from '../app-store/user-entity/user.model';

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<User[]> {
  constructor(private store: Store, private userService: UserService) {}

  resolve(): Observable<User[]> {
    return this.store.select(selectAllUsers).pipe(
      first(), // Take the current state of the users
      switchMap((users) => {
        if (users.length) {
          // If users already exist in the store, do nothing
          return of();
        }
        // If users are empty, fetch from the API
        return this.userService.getUsers().pipe(
          tap((fetchedUsers) => {
            this.store.dispatch(UserActions.loadUsers({ users: fetchedUsers }));
          }),
          catchError((error) => {
            console.error('Error fetching users:', error);
            this.store.dispatch(UserActions.loadUsersFail({error:error}));
            return of();
          })
        );
      })
    );
  }
}



// import { Injectable } from '@angular/core';
// import { Resolve } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { Observable, filter, first, tap } from 'rxjs';
// import * as UserActions from './../app-store/users/user.actions';

// import { UserState } from '../app-store/users/user.reducer';
// import { selectAllUsers } from '../app-store';
// import { UserService } from '../providers/user.service';
// import { UserActions } from '../app-store/user-entity/user.actions';

// @Injectable({ providedIn: 'root' })
// export class UsersResolver implements Resolve<void> {
//   constructor(private store: Store,private userService:UserService) {}

//   resolve(): Observable<void> {
//     return this.store.select(selectAllUsers).pipe(
//       tap(()=>{
//         console.log('resolve');
//       }),
//       tap((users:any) => {
//         if (!users.length) {
//           debugger;
//           // UserActions.
//           this.store.dispatch(UserActions.loadUsers({users:users}));
//           // this.userService.getUsers();
//         }
//       }),
//       filter((users) => !!users.length), // Wait until users are loaded
//       first() // Ensure the observable completes
//     );
//   }
// }


// import { inject } from '@angular/core';
// import { ResolveFn } from '@angular/router';
// import { UserService } from '../providers/user.service';
// import { UsersState } from '../app-store/users/user.reducer';
// import { Store } from '@ngrx/store';
// import { UserActions } from '../app-store/users/user.actions';
// import { filter, first, tap } from 'rxjs/operators';

// export const getUsersResolver: ResolveFn<UsersState[]> = (route, state) => {
//   const store = inject(Store);
  
//   return store.select((AppState)=>AppState.Users).pipe(
//     tap((users) => {
//       // if (!users.length) {
//       debugger;
//         store.dispatch(UserActions.loadUsers());
//       // }
//     }),
//     // filter((users) => !!users.length),
//     // first() // Ensure the observable completes after the first emission with data
//   );
//   // store.dispatch(UserActions.loadUsers());
//   // return inject(UserService).getUsers();
// };
