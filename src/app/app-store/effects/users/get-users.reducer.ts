import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GetUsers } from './get-users.model';
import { GetUsersActions } from './get-users.actions';

export const getUsersesFeatureKey = 'getUserses';

export interface State extends EntityState<GetUsers> {
  // additional entities state properties
}

export const adapter: EntityAdapter<GetUsers> = createEntityAdapter<GetUsers>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(GetUsersActions.addGetUsers,
    (state, action) => adapter.addOne(action.getUsers, state)
  ),
  on(GetUsersActions.upsertGetUsers,
    (state, action) => adapter.upsertOne(action.getUsers, state)
  ),
  on(GetUsersActions.addGetUserss,
    (state, action) => adapter.addMany(action.getUserss, state)
  ),
  on(GetUsersActions.upsertGetUserss,
    (state, action) => adapter.upsertMany(action.getUserss, state)
  ),
  on(GetUsersActions.updateGetUsers,
    (state, action) => adapter.updateOne(action.getUsers, state)
  ),
  on(GetUsersActions.updateGetUserss,
    (state, action) => adapter.updateMany(action.getUserss, state)
  ),
  on(GetUsersActions.deleteGetUsers,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(GetUsersActions.deleteGetUserss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(GetUsersActions.loadGetUserss,
    (state, action) => adapter.setAll(action.getUserss, state)
  ),
  on(GetUsersActions.clearGetUserss,
    state => adapter.removeAll(state)
  ),
);

export const getUsersesFeature = createFeature({
  name: getUsersesFeatureKey,
  reducer,
  extraSelectors: ({ selectGetUsersesState }) => ({
    ...adapter.getSelectors(selectGetUsersesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = getUsersesFeature;
