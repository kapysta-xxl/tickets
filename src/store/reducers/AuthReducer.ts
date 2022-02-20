import { AuthState, AuthAction, SIGN_IN, SIGN_OUT, SET_USER, SET_USER_LOADING } from '../types/auth';

const initialState: AuthState = {
    user: null,
    authenticated: false,
    loading: false
};

export default (state = initialState, action: AuthAction) => {
    switch(action.type) {
        case SIGN_IN:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case SIGN_OUT:
            return {
                ...state,
                user: null,
                authenticated: false
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case SET_USER_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
};