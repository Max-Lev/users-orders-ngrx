import { createFeature, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter as OrdersEntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Orders as Orders } from './orders.model';
import { OrdersActions } from './orders.actions';

export const ordersFeatureKey = 'orders';

export interface OrdersEntityState extends EntityState<Orders> {
  // additional entities state properties
}

export const ordersEntityAdapter: OrdersEntityAdapter<Orders> = createEntityAdapter<Orders>();

export const initialState: OrdersEntityState = ordersEntityAdapter.getInitialState({
  // additional entity state properties
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
  on(OrdersActions.deleteOrder,
    (state, action) => {
      debugger;
      return ordersEntityAdapter.removeOne(action.id, state);
    }
  ),

  on(OrdersActions.deleteOrders,
    (state, action) => ordersEntityAdapter.removeMany(action.ids, state)
  ),
  on(OrdersActions.loadOrders, (state, action) => {

    const loadOrders = ordersEntityAdapter.setAll(action.orders, state);
    return loadOrders;
  }
  ),
  on(OrdersActions.clearOrders,
    state => ordersEntityAdapter.removeAll(state)
  ),
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
