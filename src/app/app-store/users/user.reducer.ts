// import { createReducer, on } from '@ngrx/store';
// // import { UserActions } from './user.actions';
// export * as UserActions from './user.actions';
// export const userFeatureKey = 'user';

// export interface User {
//   id: number;
//   name: string;
// }

// // export const initialState: UsersState = {
// // id:-1,
// // name:'',
// // };

// import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
// import * as UserActions from './user.actions';

// export interface UserState extends EntityState<UserState> {
//   loading: boolean;
//   users: User[];
//   ids: string[] | number[];
//   entities: Dictionary<UserState>;
// }

// export const userAdapter: EntityAdapter<UserState> = createEntityAdapter<UserState>();

// const initialState: UserState = userAdapter.getInitialState({
//   loading: false,
//   users:[]
// });

// export const userReducer = createReducer(
//   initialState,
//   on(UserActions.loadUsers, (state) => {
//     console.log('loadUsers ',state)
//     return { ...state, loading: true }
//   }),
//   on(UserActions.loadUsersSuccess, (state, { users }) => {
//     debugger
//     console.log(state);
//     return userAdapter.setAll(users, { ...state, loading: false })
//   }

//   ),
//   on(UserActions.loadUsersFailure, (state) => ({ ...state, loading: false }))
// );
