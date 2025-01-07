import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Orders } from './orders.model';
import { OrdersActions } from './orders.actions';

export const ordersesFeatureKey = 'orderses';

export interface State extends EntityState<Orders> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Orders> = createEntityAdapter<Orders>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(OrdersActions.addOrders,
    (state, action) => adapter.addOne(action.orders, state)
  ),
  on(OrdersActions.upsertOrders,
    (state, action) => adapter.upsertOne(action.orders, state)
  ),
  on(OrdersActions.addOrderss,
    (state, action) => adapter.addMany(action.orderss, state)
  ),
  on(OrdersActions.upsertOrderss,
    (state, action) => adapter.upsertMany(action.orderss, state)
  ),
  on(OrdersActions.updateOrders,
    (state, action) => adapter.updateOne(action.orders, state)
  ),
  on(OrdersActions.updateOrderss,
    (state, action) => adapter.updateMany(action.orderss, state)
  ),
  on(OrdersActions.deleteOrders,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(OrdersActions.deleteOrderss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(OrdersActions.loadOrderss,
    (state, action) => adapter.setAll(action.orderss, state)
  ),
  on(OrdersActions.clearOrderss,
    state => adapter.removeAll(state)
  ),
);

export const ordersesFeature = createFeature({
  name: ordersesFeatureKey,
  reducer,
  extraSelectors: ({ selectOrdersesState }) => ({
    ...adapter.getSelectors(selectOrdersesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = ordersesFeature;
