import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UsersState } from './user.reducer';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users':emptyProps(),
    'Load Users Fail':emptyProps(),
    'Load Users Success': emptyProps(),
    'Loaded Users': props<{users:UsersState[]}>(),
    
    
  }
});
