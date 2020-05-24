import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, email) => {
    console.log('auth success');
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        email: email
    };
};

export const addAuth = (token, userId, email) => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('userId', userId);
    window.localStorage.setItem('email', email);
    return {
        type: actionTypes.ADD_AUTHORIZATON,
        token: token,
        userId: userId,
        email: email
    };
}

export const removeAuth = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('email');
    return {
        type: actionTypes.REMOVE_AUTHORIZATON
    };
}

export const checkAuth = () => {
    console.log('check auth')
    const token = window.localStorage.getItem('token') ;
    const userId = window.localStorage.getItem('userId');
    const email = window.localStorage.getItem('email');
    return dispatch => {
        if( token && userId && email ){
            dispatch(authSuccess(token, userId, email));
        } else {
            dispatch(removeAuth());
        }
    }
}