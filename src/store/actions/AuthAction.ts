import { ThunkAction } from "redux-thunk";

import { 
    AuthAction, 
    SIGN_IN, 
    User, 
    SIGN_OUT, 
    SET_USER, 
    SET_USER_LOADING 
} from "../types/auth";
import { RootState} from '..';

import "../../firebase/config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import toast from 'react-hot-toast';

// signin
export const signin = (): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_USER_LOADING,
            payload: true
        })
        const provider = new GoogleAuthProvider();
        const auth = getAuth()
        signInWithPopup(auth, provider)
        .then(({user}) => {
            const userData: User = {
                firstName: user.displayName,
                email: user.email,
                userId: user.uid,
                photoURL: user.photoURL,
            };
            dispatch({
                type: SIGN_IN,
                payload: userData
            });
            dispatch({
                type: SET_USER_LOADING,
                payload: false
            })
            toast.success('Вы успешно авторизовались!');
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: SET_USER_LOADING,
                payload: false
            })
            toast.error('Ошибка авторизации!');
        })
    }
};

// signout
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_USER_LOADING,
            payload: true
        })
        const auth = getAuth()
        auth.signOut().then(() => {
            dispatch({
                type: SIGN_OUT
            });
            dispatch({
                type: SET_USER_LOADING,
                payload: false
            })
            toast.success('Вы успешно вышли!');
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: SET_USER_LOADING,
                payload: false
            })
            toast.error('Ошибка при выходе!');
        })
    }
};

// setuser
export const setUser = (dataUser: User): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        try {
            dispatch({
                type: SET_USER,
                payload: dataUser
            })
            toast.success('Вы успешно авторизовались!');
        } catch(e) {
            console.log(e)
            toast.error('Ошибка авторизации!');
        }
    }
};