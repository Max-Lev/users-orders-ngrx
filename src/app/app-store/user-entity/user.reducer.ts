import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import { UserActions } from './user.actions';

export const usersFeatureKey = 'users';

export interface UsersState extends EntityState<User> {
  // Add custom properties here if needed
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = usersAdapter.getInitialState({
  // Add custom properties here if needed
});

export const usersReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, action) => usersAdapter.addOne(action.user, state)),
  on(UserActions.upsertUser, (state, action) => usersAdapter.upsertOne(action.user, state)),
  on(UserActions.addUsers, (state, action) => usersAdapter.addMany(action.users, state)),
  on(UserActions.upsertUsers, (state, action) => usersAdapter.upsertMany(action.users, state)),
  on(UserActions.updateUser, (state, action) => usersAdapter.updateOne(action.user, state)),
  on(UserActions.updateUsers, (state, action) => usersAdapter.updateMany(action.users, state)),
  on(UserActions.deleteUser, (state, action) => usersAdapter.removeOne(action.id, state)),
  on(UserActions.deleteUsers, (state, action) => usersAdapter.removeMany(action.ids, state)),
  on(UserActions.loadUsers, (state, action) => {
    console.log({...state});
    const all =  usersAdapter.setAll(action.users, state);
    console.log(all)
    return all;
  }),
  on(UserActions.clearUsers, (state) => usersAdapter.removeAll(state)),
  on(UserActions.loadUsersFail, (state,action) => {
    console.log(state,action)
    return {...state};
  }),
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer: usersReducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...usersAdapter.getSelectors(selectUsersState),
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = usersFeature;





