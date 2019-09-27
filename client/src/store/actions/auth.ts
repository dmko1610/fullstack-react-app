import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token: string, userId: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error: any) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime: number) => {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
};

export const auth = (email: string, password: string, isSignUp: boolean) => {
    return (dispatch: any) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGZHUKtLgdYXxFCgqfnlBqYV54x2xkF8s';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGZHUKtLgdYXxFCgqfnlBqYV54x2xkF8s';
        }
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const setAuthRedirectPath = (path: string) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};
