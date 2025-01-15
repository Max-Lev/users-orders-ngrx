import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Orders } from './orders.model';
import { User } from '../users-entity/user.model';

export const OrdersActions = createActionGroup({
  source: 'Orders/API',
  events: {
    'Load Orders Fail': props<{ message: string }>(),
    'Load Orders': props<{ orders: Orders[] }>(),
    'Add Order': props<{ orders: Orders }>(),
    'Upsert Order': props<{ orders: Orders }>(),
    'Add Orders': props<{ orders: Orders[] }>(),
    'Upsert Orders': props<{ orders: Orders[] }>(),
    'Update Order': props<{ orders: Update<Orders> }>(),
    'Update Orders': props<{ orders: Update<Orders>[] }>(),
    'Delete Order': props<{ id: number }>(),
    'Delete Orders': props<{ ids: number[] }>(),
    // 'Delete User and Orders': props<{ order: Orders[], user:User }>(),
    'Clear Orders': emptyProps(),
  }
});

export const deleteUserAndOrders = createAction('Delete User and Orders',props<{ orders: Orders[], user:User }>());