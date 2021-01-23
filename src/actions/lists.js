import api from '../utils/api';

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

    const body = JSON.stringify({title: title[0]});

    try {
        const res = await api.post('/lists', body);

        dispatch({
            type: SAVE_LIST_SUCCESS,
            // Eventually fix res.json({ list }) on backend
            payload: res.data.list
        })

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
        const body = JSON.stringify({ title: title[0] });

        const res = await api.put(`/lists/${id}`, body);

        dispatch({
            type: UPDATE_LIST_SUCCESS,
            payload: res.data.list
        })
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
            payload: res.data.list
        })

    } catch (err) {
        console.log(err.message);

    }
}