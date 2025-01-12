import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';
export * as UsersActions from './user.actions';
export const userFeatureKey = 'user';

export interface UsersLoadState {
    loadingSuccess: boolean;
    errorMsg: string | null;
}

export const initialState: UsersLoadState = {
    loadingSuccess: false,
    errorMsg: null
};

export const usersLoadReducer = createReducer(
    initialState,
    on(loadUsers, (state) => {
        return { ...state, loadingSuccess: true }
    }),
    on(loadUsersSuccess, (state, action) => ({
        ...state,
        loadingSuccess: action.usersLoadState.loadingSuccess,
        errorMsg: action.usersLoadState.errorMsg
    })),
    on(loadUsersFailure, (state) => ({ ...state, loadingSuccess: false }))
);
