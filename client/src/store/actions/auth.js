import axios from 'axios'
//import axios from 'axios-https-proxy-fix'; 
// const axios = require('axios-proxy-fix');
import * as actionTypes from './actionTypes'

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
};

export const fetchUserSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        payload: payload
    }
};

export const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    }
};

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const fetchUser = () => {
    return dispatch => {
        dispatch(fetchUserStart());
        axios.get('/api/fetchUser', {
            cancelToken: source.token
        }).then( result => {
            console.log(result)
            const payload = result.data
            dispatch(fetchUserSuccess(payload));
        }).catch( error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                // handle error
                dispatch(fetchUserFail(error))
            }
        })
    }
}

export const logout = () => {
    axios.get('/auth/logout')
    //localStorage.removeItem('token');
    //localStorage.removeItem('expirationDate');
    //localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkLoginTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (values, authLogin) => {
    return dispatch => {
        dispatch(authStart());
        let url = '/auth/login';
        if (!authLogin) { url = '/auth/signup'; }       
        axios.post(url, values)
            .then(response => {
                console.log(response);
                const data = response.data.results;
                console.log(data);
                dispatch(authSuccess(data)) 
             })
             .catch(err => {
                 console.log(err);
                 dispatch(authFail(err));
             })}}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START}}

export const authSuccess = (token, userId) => {
    return {
        type    : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId  : userId}}

export const authFail = (error) => {
    return {
        type    : actionTypes.AUTH_FAIL,
        error   : error}}

export const fbAuth = () => {
    return dispatch => {
        dispatch(fbAuthStart());
        dispatch(fbAuthSuccess());
        //dispatch(fbAuthFail(err))
    }}

export const fbAuthStart = () => {
    return {
        type    : actionTypes.FB_AUTH_START}}

export const fbAuthSuccess = () => {
    return {
        type    : actionTypes.FB_AUTH_SUCCESS}}

export const fbAuthFail = (error) => {
    return {
        type    : actionTypes.FB_AUTH_FAIL,
        error   : error}}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path}}