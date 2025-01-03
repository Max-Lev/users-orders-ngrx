import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { GetUsers } from './get-users.model';

export const GetUsersActions = createActionGroup({
  source: 'GetUsers/API',
  events: {
    'Load GetUserss': props<{ getUserss: GetUsers[] }>(),
    'Add GetUsers': props<{ getUsers: GetUsers }>(),
    'Upsert GetUsers': props<{ getUsers: GetUsers }>(),
    'Add GetUserss': props<{ getUserss: GetUsers[] }>(),
    'Upsert GetUserss': props<{ getUserss: GetUsers[] }>(),
    'Update GetUsers': props<{ getUsers: Update<GetUsers> }>(),
    'Update GetUserss': props<{ getUserss: Update<GetUsers>[] }>(),
    'Delete GetUsers': props<{ id: string }>(),
    'Delete GetUserss': props<{ ids: string[] }>(),
    'Clear GetUserss': emptyProps(),
  }
});
