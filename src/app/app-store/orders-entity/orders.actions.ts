import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Orders } from './orders.model';

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
    'Delete Order': props<{ id: string }>(),
    'Delete Orders': props<{ ids: string[] }>(),
    'Clear Orders': emptyProps(),
  }
});
