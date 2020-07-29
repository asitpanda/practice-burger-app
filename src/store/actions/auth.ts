import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token: string, userId: string | null) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

const authFail = (error: string) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime: number) => {
    return ((dispatch: any) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    });
};

export const auth = (email: string, password: string, isSignup: boolean) => {
    return (dispatch: any) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEbLPQpY6pD68KGYDwkVfg2VMD_Kombdk';
        if (!isSignup)
        {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEbLPQpY6pD68KGYDwkVfg2VMD_Kombdk';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate: any = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path: string) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return (dispatch: any) => {
        const token = localStorage.getItem('token');
        if (!token)
        {
            dispatch(logout());
        } else
        {
            const expiryDate = localStorage.getItem('expirationDate') || '';
            const expirationDate: any = new Date(expiryDate);
            if (expirationDate <= new Date())
            {
                dispatch(logout());
            } else
            {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};