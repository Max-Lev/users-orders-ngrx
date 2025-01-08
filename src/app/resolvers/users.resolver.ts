import { inject } from '@angular/core';
import {  ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../providers/user.service';
import { UserActions } from '../app-store/users-entity/users-entity.actions';
import { User } from '../app-store/users-entity/user.model';
import { loadUsersFailure, loadUsersSuccess } from '../app-store/users/user.actions';
import { OrdersService } from '../providers/orders.service';
import { Orders } from '../app-store/orders-entity/orders.model';
import { OrdersActions } from '../app-store/orders-entity/orders.actions';
import { selectAll } from '../app-store/users-entity/users-entity.reducer';

export const usersResolver: ResolveFn<Observable<User[] | Orders[]>> = (route, state) => {
  const store = inject(Store);
  const userService = inject(UserService);
  const orderService = inject(OrdersService);  // Inject the Order Service

  return store.select(selectAll).pipe(
    first(), // Take the current state of the users
    switchMap((users) => {
      if (users.length) {
        // If users already exist in the store, do nothing
        return of(users); // Return users directly if available
      }
      // If users are empty, fetch from the API
      return userService.getUsers().pipe(
        tap((fetchedUsers: User[]) => {
          // Dispatch success action for users
          store.dispatch(loadUsersSuccess({ usersLoadState: { loadingSuccess: true, errorMsg: null } }));
          store.dispatch(UserActions.loadUsers({ users: fetchedUsers }));
        }),

        catchError((error) => {
          console.error('Error fetching users:', error);
          store.dispatch(loadUsersFailure({ error }));
          return of([]); // Return empty array on error, to ensure no breakage
        }),

        // After fetching users, proceed to fetch orders
        switchMap(() => 
          orderService.getOrders$().pipe(
            tap((fetchedOrders: Orders[]) => {
              // Dispatch success action for orders
              store.dispatch(OrdersActions.loadOrders({ orders: fetchedOrders }));
            }),

            catchError((error) => {
              console.error('Error fetching orders:', error);
              store.dispatch(OrdersActions.loadOrdersFail({ message: error }));
              return of([]); // Return empty array if orders fetch fails, but ensure users are loaded
            })
          )
        )
      );
    })
  );
};






