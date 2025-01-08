import { isDevMode } from '@angular/core';
import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { selectEntities, selectUserEntitiesState, usersEntityReducer, UsersEntityState } from './users-entity/users-entity.reducer';
import { usersLoadReducer, UsersLoadState } from './users/user.reducer';
import { User } from './users-entity/user.model';
import { OrdersEntityState, ordersReducer, selectAll, selectOrdersEntitiesState } from './orders-entity/orders.reducer';
import { Orders } from './orders-entity/orders.model';
import { OrdersData } from '../components/user-orders/orders-table-datasource';

export interface AppState {
  usersLoadState: UsersLoadState;
  users: UsersEntityState;
  orders: OrdersEntityState;
}

export const reducers: ActionReducerMap<AppState> = {

  users: usersEntityReducer,
  usersLoadState: usersLoadReducer,
  orders: ordersReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

export const selectAllUsersEntities = createSelector(selectUserEntitiesState, (state) => Object.values(state.entities));

// Custom selector to get the selected user ID
export const selectedUserId = createSelector(selectUserEntitiesState, (state: UsersEntityState) => state.selectedUserId);

// Custom selector to get the selected user entity
export const selectedUser = createSelector(
  selectEntities, // Get the dictionary of entities
  selectedUserId, // Get the selected user ID
  (entities, selectedUserId) => {
    return (selectedUserId ? entities[selectedUserId] : null) // Find the selected user
  }
);

export const getUserActionType = createSelector(selectUserEntitiesState, (state) => { return state.action });

export const selectAllOrdersEntities = createSelector(selectOrdersEntitiesState, (state) => Object.values(state.entities));

export const selectUserOrders = createSelector(selectAll, selectedUserId, selectedUser,
  (selectAll: Orders[], selectedUserId: number | null, selectedUser: User | null | undefined) => {
    const userOrders = selectAll.filter((order: Orders) => order.userId === selectedUserId);
    console.log('selectUserOrders')
    return userOrders.map((order) => {
      return {
        id: selectedUserId,
        name: selectedUser?.name,
        order: order.id,
        price: order.total
      }
    }) as OrdersData[];
  }
);

export const totalOrderSumSelector = createSelector(selectUserOrders, (selectUserOrders) => {
  return selectUserOrders.reduce((sum, order) => sum + order.price, 0);
});

// export const isUserExists = (name: string) => createSelector(selectEntities, (selectEntities: Dictionary<User>) => {
//   const x =  Object.values(selectEntities).some((user) => user!.name.toLowerCase() === name.toLowerCase());
//   return x;
// });
// export const isUserExistsSelector = (name: string) =>
//   createSelector(selectEntities, (entities: Dictionary<User>) => {
//     return Object.values(entities).some((user) => user && user.name.toLowerCase() === name.toLowerCase());
//   });


