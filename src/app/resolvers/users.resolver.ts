import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
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
  const orderService = inject(OrdersService);

  return store.select(selectAll).pipe(
    first(),
    switchMap((users) => {
      if (users.length) {
        return of(users);
      }
      return userService.getUsers$().pipe(
        tap((fetchedUsers: User[]) => {
          store.dispatch(loadUsersSuccess({ usersLoadState: { loadingSuccess: true, errorMsg: null } }));
          store.dispatch(UserActions.loadUsers({ users: fetchedUsers }));
        }),

        catchError((error) => {
          console.error('Error fetching users:', error);
          store.dispatch(loadUsersFailure({ error }));
          return of([]);
        }),

        switchMap(() =>
          orderService.getOrders$().pipe(
            tap((fetchedOrders: Orders[]) => {
              store.dispatch(OrdersActions.loadOrders({ orders: fetchedOrders }));
            }),
            catchError((error) => {
              console.error('Error fetching orders:', error);
              store.dispatch(OrdersActions.loadOrdersFail({ message: error }));
              return of([]);
            })
          )
        )
      );
    })
  );
};






