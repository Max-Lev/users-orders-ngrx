import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter as UsersEntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import { UserActions } from './user-entity.actions';

export const usersEntityFeatureKey = 'usersEntityFeatureKey';

export interface UsersEntityState extends EntityState<User> {
  // Add custom properties here if needed
  selectedUserId: number | null;
}

export const usersEntityAdapter: UsersEntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersEntityState = usersEntityAdapter.getInitialState({
  // Add custom properties here if needed
  selectedUserId: null
});

export const usersEntityReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, action) => usersEntityAdapter.addOne(action.user, state)),
  on(UserActions.upsertUser, (state, action) => usersEntityAdapter.upsertOne(action.user, state)),
  on(UserActions.addUsers, (state, action) => usersEntityAdapter.addMany(action.users, state)),
  on(UserActions.upsertUsers, (state, action) => usersEntityAdapter.upsertMany(action.users, state)),
  on(UserActions.updateUser, (state, action) => usersEntityAdapter.updateOne(action.user, state)),
  on(UserActions.updateUsers, (state, action) => usersEntityAdapter.updateMany(action.users, state)),
  on(UserActions.deleteUser, (state, action) => usersEntityAdapter.removeOne(action.id, state)),
  on(UserActions.deleteUsers, (state, action) => usersEntityAdapter.removeMany(action.ids, state)),
  on(UserActions.loadUsers, (state, action) => {
    const all = usersEntityAdapter.setAll(action.users, state);
    console.log(all)
    return all;
  }),
  on(UserActions.clearUsers, (state) => usersEntityAdapter.removeAll(state)),

);

// export const usersFeature = createFeature({
//   name: usersEntityFeatureKey,
//   reducer: usersEntityReducer,
//   extraSelectors: ({ selectUsersState }) => ({
//     ...usersEntityAdapter.getSelectors(selectUsersState),
//   }),
// });

// export const {
//   selectAll, // Returns all entities as an array
//   selectEntities, // Returns entities as a dictionary (key-value pair)
//   selectIds, // Returns the array of IDs
//   selectTotal, // Returns the total count of entities
// } = usersEntityAdapter.getSelectors(); // Replace `selectUserState` with the feature selector




// export const {
//   selectIds,
//   selectEntities,
//   selectAll,
//   selectTotal,
// } = usersFeature;





