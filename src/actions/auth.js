import api from '../utils/api';
import * as RootNavigation from '../utils/RootNavigation';
import { setError } from './alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USER_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SIGN_OUT
} from './types';


/* ===================================
   Login user
=================================== */
export const login = (name, password) => async dispatch => {
    const body = JSON.stringify({ name, password });

    try {

        if(!name) {
            return dispatch(setError('Please enter a name'));
        }

        if(!password) {
            return dispatch(setError('Please enter a password'));
        }

        const res = await api.post('/user/login', body);

        await AsyncStorage.setItem('token', res.data.token)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        })

        // Get user info and redirect to home
        getUser(dispatch);

    } catch (err) {
        dispatch(setError(err.response.data.msg));

        dispatch({
            type: LOGIN_FAIL
        })
    }
}


/* ===================================
   Register user
=================================== */
export const register = (name, password, password2) => async dispatch => {
    try {

        if(!name) {
            return dispatch(setError('Please enter a name'));
        }

        if(name.includes(' ')) {
            return dispatch(setError('Username can\'t include empty spaces'));
        }

        if(!password) {
            return dispatch(setError('Please enter a password'));
        }

        if(password !== password2) {
            return dispatch(setError('Passwords do not match'));
        }

        const res = await api.post('/user/register', { name, password });

        await AsyncStorage.setItem('token', res.data.token)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        })

        getUser(dispatch);
    } catch (err) {
        // dispatch(setError('err.response.data.msg'));
        dispatch(setError(err.response.data.msg));

        dispatch({
            type: REGISTER_FAIL
        })
    }

}


/* ===================================
   Get user info
=================================== */
export const getUser = async (dispatch) => {

    // Redirect to Home Screen after login
    RootNavigation.navigate('Home');

    const res = await api.get('/user');

    dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data
    })



}

/* ===================================
   Logout user
=================================== */
export const logout = () => async dispatch => {
    await AsyncStorage.removeItem('token');

    dispatch({
        type: SIGN_OUT
    })

    RootNavigation.navigate('Auth');
}



/* ===================================
   AsyncStorage for local signin
=================================== */
export const localLogin = () => async dispatch => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: token
            })
            
           getUser(dispatch);
    
        } else {
            RootNavigation.navigate('Auth');
            
        }    
    } catch (err) {
        console.log(err) 
    }  
   
}
