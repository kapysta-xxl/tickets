export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_USER = 'SET_USER';
export const SET_USER_LOADING = 'SET_USER_LOADING';

export interface User {
    firstName?: string | null;
    email?: string | null;
    userId?: string | null;
    photoURL?: any;
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
}

//Actions

export interface SignInAction {
    type: typeof SIGN_IN;
    payload: User;
}

export interface SignOutAction {
    type: typeof SIGN_OUT;
}

export interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

export interface SetUserLoadingAction {
    type: typeof SET_USER_LOADING;
    payload: boolean;
}

export type AuthAction = SignInAction | SignOutAction | SetUserAction | SetUserLoadingAction;

