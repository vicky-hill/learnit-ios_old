import api from '../utils/api';
import { setError } from './alerts';
import { toggleSlide } from './utils';

import {
    GET_WORDS_SUCCESS,
    GET_WORDS_FAIL,
    SAVE_WORD_SUCCESS,
    SAVE_WORD_FAIL,
    DELETE_WORD_SUCCESS,
    UPDATE_WORD_SUCCESS
} from './types';


/* ===================================
   Get all words
=================================== */
export const getWords = () => async dispatch => {
    try {
        const res = await api.get('/words');

        dispatch({
            type: GET_WORDS_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch(setError('Couldnt load words'))

        dispatch({
            type: GET_WORDS_FAIL
        })
    }
}


/* ===================================
   Save new word
=================================== */
                     // ['spanish', 'english'], listId
export const saveWord = (editData, list) => async dispatch => {
    const body = JSON.stringify({ spanish: editData[0], english: editData[1], list });

    try {

        if(!editData[0] || !editData[1]) {
            return dispatch(setError('Fields can\'t be empty'));
        }

        const res = await api.post('/words', body);

        dispatch({
            type: SAVE_WORD_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch(setError('Couldnt save word'))

        dispatch({
            type: SAVE_WORD_FAIL
        })
    }
}


/* ===================================
   Update word
=================================== */
                        // ['spanish', 'english'], id
export const updateWord = (editData, id) => async dispatch => {
    try {

        if(!editData[0] || !editData[1]) {
            return dispatch(setError('Fields can\'t be empty'));
        }

        const body = { spanish: editData[0], english: editData[1] }
        const res = await api.put(`/words/${id}`, body);
        
        dispatch({
            type: UPDATE_WORD_SUCCESS,
            payload: res.data
        })

        dispatch(toggleSlide());
    } catch (err) {
        dispatch(setError('Couldnt update word'))

        dispatch({
            type: SAVE_WORD_FAIL
        })
    }
}


/* ===================================
   Delete word
=================================== */
export const deleteWord = id => async dispatch => {
    try {
        const res = await api.delete(`/words/${id}`);

        dispatch({
            type: DELETE_WORD_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        console.log(err.message);

    }
}