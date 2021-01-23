import { Animated, Keyboard } from 'react-native';

import {
    TOGGLE_SLIDESCREEN,
    GET_SEARCH_TERM,
    OPEN_CREATE_LIST,
    OPEN_EDIT_LIST,
    OPEN_CREATE_WORD,
    OPEN_EDIT_WORD,
    CLEAR_SEARCH,
    TOGGLE_SIDESCREEN
} from './types';


/* ===================================
   Toggle SlideScreen
=================================== */
export const toggleSlide = () => async (dispatch, getState) => {

    // Get isHidden and bounceValue from state
    const isHidden = getState().utils.slideScreen.isHidden;
    const bounceValue = getState().utils.slideScreen.bounceValue;

    let toValue = 1000;

    if (isHidden) {
        toValue = 0;
    }

    Animated.spring(
        bounceValue,
        {
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true
        }
    ).start();

    Keyboard.dismiss();

    dispatch({
        type: TOGGLE_SLIDESCREEN
    })
}


/* ===================================
   toggle SideScreen
=================================== */
export const toggleSide = () => async (dispatch, getState) => {

    // Get isHidden and bounceValue from state
    const isHidden = getState().utils.sideScreen.isHidden;
    const bounceValue = getState().utils.sideScreen.bounceValue;

    let toValue = -1000;

    if (isHidden) {
        toValue = 0;
    }

    Animated.spring(
        bounceValue,
        {
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true
        }
    ).start();

    Keyboard.dismiss();

    dispatch({
        type: TOGGLE_SIDESCREEN
    })
}


/* ===================================
   Open EditForm 
=================================== */
export const openEdit = (editType, editData, editId) => dispatch => {

    // EditType: createWord | editWord | createList | editList
    // EditData: ['word', 'translation'] | ['listname']
    // EditId: Id of word/list to edit

    try {
        switch(editType) {

            case 'createList':
                return dispatch({
                    type: OPEN_CREATE_LIST
                })

            case 'editList':
                return dispatch({
                    type: OPEN_EDIT_LIST,
                    payload: { editData, editId }
                })

            case 'createWord':
                return dispatch({
                    type: OPEN_CREATE_WORD,
                    payload: { editId }
                })

            case 'editWord':
                return dispatch({
                    type: OPEN_EDIT_WORD,
                    payload: { editData, editId}
                })
        }


    } catch (err) {

    }
}


/* ===================================
   Search vocabulary
=================================== */
export const getSearchTerm = (searchedWord) => async dispatch => {
    dispatch({
        type: GET_SEARCH_TERM,
        payload: searchedWord
    })
}

export const clearSearch = () => dispatch => {
    dispatch({
        type: CLEAR_SEARCH
    })
}