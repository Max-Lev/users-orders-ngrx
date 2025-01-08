import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { selectEntities, selectUserEntitiesState, usersEntityAdapter, usersEntityFeatureKey, usersEntityReducer, UsersEntityState } from './users-entity/users-entity.reducer';
import { usersLoadReducer, UsersLoadState } from './users/user.reducer';
import { User } from './users-entity/user.model';
import { OrdersEntityState, ordersFeatureKey, ordersReducer, selectAll, selectOrdersEntitiesState } from './orders-entity/orders.reducer';
import { Orders } from './orders-entity/orders.model';
import { OrdersData } from '../components/user-orders/orders-table-datasource';
import { Dictionary } from '@ngrx/entity';
import { of } from 'rxjs';


// export const usersFeatureKey = 'users';

export interface AppState {
  usersLoadState: UsersLoadState;
  users: UsersEntityState;
  orders: OrdersEntityState;
  // users:{
  //   enetities:{[id:number]:UsersEntityState};
  //   selectedUserId:number| null;
  // },
  // orders:{
  //   entities:{[id:number]:Order};
  // }

}

export const reducers: ActionReducerMap<AppState> = {

  users: usersEntityReducer,
  usersLoadState: usersLoadReducer,
  orders: ordersReducer
  // users:usersEntityReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

// export const selectUserEntitiesState = createFeatureSelector<UsersEntityState>('usersEntityState');
// export const selectUserEntitiesState = createFeatureSelector<UsersEntityState>(usersEntityFeatureKey);

// export const { selectAll: selectAllUsers } = usersEntityAdapter.getSelectors(selectUserEntitiesState);

export const selectAllUsersEntities = createSelector(selectUserEntitiesState, (state) => Object.values(state.entities));

// Custom selector to get the selected user ID
export const selectedUserId = createSelector(selectUserEntitiesState, (state: UsersEntityState) => state.selectedUserId);

// Custom selector to get the selected user entity
export const selectedUser = createSelector(
  selectEntities, // Get the dictionary of entities
  selectedUserId, // Get the selected user ID
  selectUserEntitiesState,
  (entities, selectedUserId, selectUserEntitiesState) => {
    return (selectedUserId ? entities[selectedUserId] : null) // Find the selected user
  }
);
// export const updatedUser = createSelector(
//   selectEntities, // Get the dictionary of entities
//   selectedUserId, // Get the selected user ID
//   selectUserEntitiesState,
//   (entities, selectedUserId,selectUserEntitiesState) => {
//     console.log('updatedUser ', entities, selectedUserId,selectUserEntitiesState);
//     debugger;
//     return (selectedUserId ? entities[selectedUserId]?.name : null) // Find the selected user;
//   }
// );

export const getUserActionType = createSelector(selectUserEntitiesState, (state) => { return state.action });


export const selectAllOrdersEntities = createSelector(selectOrdersEntitiesState, (state) => Object.values(state.entities));

// export const isUserExists = (name: string) => createSelector(selectEntities, (selectEntities: Dictionary<User>) => {
//   const x =  Object.values(selectEntities).some((user) => user!.name.toLowerCase() === name.toLowerCase());
//   return x;
// });
export const isUserExistsSelector = (name: string) =>
  createSelector(selectEntities, (entities: Dictionary<User>) => {
    console.log('isUserExists ', name)
    return Object.values(entities).some((user) => user && user.name.toLowerCase() === name.toLowerCase());
  });

export const selectUserOrders = createSelector(
  selectAll,
  selectedUserId,
  selectedUser,
  (selectAll: Orders[], selectedUserId: number | null, selectedUser: User | null | undefined) => {
    const userOrders = selectAll.filter((order: Orders) => order.userId === selectedUserId);
    const userOrdersDataTable = userOrders.map((order) => {
      return {
        id: selectedUserId,
        name: selectedUser?.name,
        order: order.id,
        price: order.total
      }
    }) as OrdersData[];
    return userOrdersDataTable;
  }
);

// export const getEntitiesIds =createSelector(
//   selectUserEntitiesState,
//   (state: UsersEntityState) => {
//     console.log('selectedUserId ',state.ids);
//     debugger
//     return state.ids.length ? Math.max(...state.ids.map((id) => Number(id))) : null; ;
//   }
// );

