import { createFeature, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter as OrdersEntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Orders as Orders } from './orders.model';
import { deleteUserAndOrders, OrdersActions } from './orders.actions';

export const ordersFeatureKey = 'orders';

export interface OrdersEntityState extends EntityState<Orders> {

}

export const ordersEntityAdapter: OrdersEntityAdapter<Orders> = createEntityAdapter<Orders>();

export const initialState: OrdersEntityState = ordersEntityAdapter.getInitialState({

});

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.addOrder,
    (state, action) => ordersEntityAdapter.addOne(action.orders, state)
  ),
  on(OrdersActions.upsertOrder,
    (state, action) => ordersEntityAdapter.upsertOne(action.orders, state)
  ),
  on(OrdersActions.addOrders,
    (state, action) => ordersEntityAdapter.addMany(action.orders, state)
  ),
  on(OrdersActions.upsertOrders,
    (state, action) => ordersEntityAdapter.upsertMany(action.orders, state)
  ),
  on(OrdersActions.updateOrder,
    (state, action) => ordersEntityAdapter.updateOne(action.orders, state)
  ),
  on(OrdersActions.updateOrders,
    (state, action) => ordersEntityAdapter.updateMany(action.orders, state)
  ),

  on(OrdersActions.deleteOrder, (state, action) => {
    return ordersEntityAdapter.removeOne(action.id, state);
  }),

  on(OrdersActions.deleteOrders, (state, action) => {
    return ordersEntityAdapter.removeMany(action.ids, state);
  }),

  on(OrdersActions.loadOrders, (state, action) => {
    return ordersEntityAdapter.setAll(action.orders, state);
  }),
  on(OrdersActions.clearOrders,
    state => ordersEntityAdapter.removeAll(state)
  ),

  on(deleteUserAndOrders, (state, action) => {
    const list = action.orders?.map((order: Orders | undefined) => {
      if (order?.userId === action.user.id) {
        return order.id;
      }
      return undefined;
    }).filter((id): id is number => id !== undefined);;
    
    return ordersEntityAdapter.removeMany(list, state)
  })

);

export const selectOrdersEntitiesState = createFeatureSelector<OrdersEntityState>(ordersFeatureKey);

export const ordersesFeature = createFeature({
  name: ordersFeatureKey,
  reducer: ordersReducer,
  extraSelectors: ({ selectOrdersState }) => ({
    ...ordersEntityAdapter.getSelectors(selectOrdersState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = ordersesFeature;
