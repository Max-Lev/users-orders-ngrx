import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from './user.model';
import { Orders } from '../orders-entity/orders.model';

export const UserActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load Users': props<{ users: User[] }>(),
    'Load Users Fail': props<{ error:string  }>(),
    'Load Users Success': props<{ users: User[] }>(),
    'Add User': props<{ user: User }>(),
    'Upsert User': props<{ user: User }>(),
    'Add Users': props<{ users: User[] }>(),
    'Upsert Users': props<{ users: User[] }>(),
    'Update User': props<{ user: Update<User> }>(),
    'Selected User': props<{ user: User | null}>(),
    'Update Users': props<{ users: Update<User>[] }>(),
    'Delete User': props<{ id: number }>(),
    'Delete Users': props<{ ids: string[] }>(),
    // 'Delete User and Orders': props<{ user: User,orders:Orders[] }>(),
    'Clear Users': emptyProps(),
  }
});

export const deleteUserAndOrders = createAction('Delete User and Orders',props<{ orders: Orders[], user:User }>());