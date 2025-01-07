import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Orders } from './orders.model';

export const OrdersActions = createActionGroup({
  source: 'Orders/API',
  events: {
    'Load Orderss': props<{ orderss: Orders[] }>(),
    'Add Orders': props<{ orders: Orders }>(),
    'Upsert Orders': props<{ orders: Orders }>(),
    'Add Orderss': props<{ orderss: Orders[] }>(),
    'Upsert Orderss': props<{ orderss: Orders[] }>(),
    'Update Orders': props<{ orders: Update<Orders> }>(),
    'Update Orderss': props<{ orderss: Update<Orders>[] }>(),
    'Delete Orders': props<{ id: string }>(),
    'Delete Orderss': props<{ ids: string[] }>(),
    'Clear Orderss': emptyProps(),
  }
});
