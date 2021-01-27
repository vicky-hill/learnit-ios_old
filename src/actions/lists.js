import api from '../utils/api';
import { setError } from './alerts';
import { toggleSlide } from './utils';

import {
    GET_LISTS,
    SAVE_LIST_SUCCESS,
    SAVE_LIST_FAIL,
    DELETE_LIST_SUCCESS,
    UPDATE_LIST_SUCCESS
} from './types';


/* ===================================
   Get all lists
=================================== */
export const getLists = () => async dispatch => {
    try {
        const res = await api.get('/lists');

        dispatch({
            type: GET_LISTS,
            payload: res.data
        })

    } catch (err) {
        console.log(err)
    }
}



/* ===================================
   Save new list
=================================== */
               // ['new list title']
export const saveList = (title) => async dispatch => {

    try {
    
        if(!title[0]) {
            return dispatch(setError('List title can\'t be empty'));
        }
    
        const body = JSON.stringify({title: title[0]});

        const res = await api.post('/lists', body);

        dispatch({
            type: SAVE_LIST_SUCCESS,
            payload: res.data
        })

        dispatch(toggleSlide());

    } catch (err) {

        console.log(err);
        dispatch({
            type: SAVE_LIST_FAIL,
            payload: 'Something went wrong'
        })
    }
}


/* ===================================
   Update list
=================================== */
                   // ['new list title'], id
export const updateList = (title, id) => async dispatch => {
    try {

        if(!title[0]) {
            return dispatch(setError('List title can\'t be empty'));
        }

        const body = JSON.stringify({ title: title[0] });

        const res = await api.put(`/lists/${id}`, body);

        dispatch({
            type: UPDATE_LIST_SUCCESS,
            payload: res.data
        })

        dispatch(toggleSlide());
    } catch (err) {
        console.log(err.message)
    }
}


/* ===================================
   Delete list
=================================== */
export const deleteList = id => async dispatch => {
    try {
        const res = await api.delete(`lists/${id}`);

        dispatch({
            type: DELETE_LIST_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        console.log(err.message);

    }
}