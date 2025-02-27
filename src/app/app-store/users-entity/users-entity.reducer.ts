import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter as UsersEntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import { deleteUserAndOrders, UserActions } from './users-entity.actions';

export const usersEntityFeatureKey = 'users';
export interface UsersEntityState extends EntityState<User> {
  selectedUserId: number | null;
  action?: string;
}

export const usersEntityAdapter: UsersEntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersEntityState = usersEntityAdapter.getInitialState({
  selectedUserId: null
});

export const usersEntityReducer = createReducer(
  initialState,

  on(UserActions.addUser, (state, action) => {
    let uuid = state.ids.length ? Math.max(...state.ids.map((id) => Number(id))) : null;
    action = { ...action, ...{ user: { name: action.user.name, id: ++uuid! } } };
    return usersEntityAdapter.addOne(action.user, state);
  }),

  on(UserActions.upsertUser, (state, action) => usersEntityAdapter.upsertOne(action.user, state)),

  on(UserActions.addUsers, (state, action) => usersEntityAdapter.addMany(action.users, state)),

  on(UserActions.upsertUsers, (state, action) => usersEntityAdapter.upsertMany(action.users, state)),

  on(UserActions.updateUser, (state, action) => {
    const update = { ...state, ...{ selectedUserId: action.user && +action.user.id, action: action.type } };
    console.log('UserActions.updateUser ',update)
    return usersEntityAdapter.updateOne(action.user, update);
  }),

  on(UserActions.selectedUser, (state, action) => {
    const selectedUser = { ...state, ...{ selectedUserId: action.user && +action.user.id, action: action.type } };
    console.log('UserActions.selectedUser ',selectedUser)
    return selectedUser;
  }),

  on(UserActions.updateUsers, (state, action) => usersEntityAdapter.updateMany(action.users, state)),

  on(UserActions.deleteUser, (state, action) => {
    const isUserActive = (state.selectedUserId===action.id) ?action.id: state.selectedUserId;
    const deleteUser = { ...state, ...{ selectedUserId: isUserActive, action: action.type } };
    console.log('UserActions.deleteUser ',deleteUser)
    return usersEntityAdapter.removeOne(action.id, deleteUser);
  }),

  on(UserActions.deleteUsers, (state, action) => usersEntityAdapter.removeMany(action.ids, state)),

  on(UserActions.loadUsers, (state, action) => {
    return usersEntityAdapter.setAll(action.users, state);
  }),
  on(UserActions.clearUsers, (state) => usersEntityAdapter.removeAll(state)),

  on(deleteUserAndOrders, (state, action) => {
    
    return usersEntityAdapter.removeOne(action.user.id, state);
  })

);

export const selectUserEntitiesState = createFeatureSelector<UsersEntityState>(usersEntityFeatureKey);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = usersEntityAdapter.getSelectors(selectUserEntitiesState);


// export const selectAllUsersEntities = createSelector(selectUserEntitiesState, (state) => Object.values(state.entities));

// export const selectedUserId = createSelector(selectUserEntitiesState, (state: UsersEntityState) => state.selectedUserId);

// export const selectedUser = createSelector(
//   selectEntities,
//   // selectAll,
//   selectedUserId,
//   (entities, selectedUserId) => {
//     return (selectedUserId ? entities[selectedUserId] : null)
//   }
// );

// export const getUserActionType = createSelector(selectUserEntitiesState, (state) => { return state.action });
