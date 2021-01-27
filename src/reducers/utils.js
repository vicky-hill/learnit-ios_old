import { Animated } from 'react-native';

import {
    TOGGLE_SLIDESCREEN,
    CLOSE_SLIDESCREEN,
    GET_SEARCH_TERM, 
    OPEN_CREATE_LIST,
    OPEN_EDIT_LIST,
    OPEN_CREATE_WORD,
    OPEN_EDIT_WORD,
    CLEAR_SEARCH,
    TOGGLE_SIDESCREEN
} from '../actions/types';

const initialState = {
    slideScreen: {
        isHidden: true,
        bounceValue: new Animated.Value(1000)
    },

    sideScreen: {
        isHidden: true,
        bounceValue: new Animated.Value(-1000)
    },

    search: {
        term: ''
    },

    edit: {
        // createWord | editWord | createList | editList
        editMode: '',   
        // ['word', 'translation'] | ['list']
        editData: [],
        // Id of item to edit
        editId: ''
    }

}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case TOGGLE_SLIDESCREEN:
            return {
                ...state,
                slideScreen: {
                    ...state.slideScreen,
                    isHidden: !state.slideScreen.isHidden
                }
            }

        case CLOSE_SLIDESCREEN:
            return {
                ...state,
                slideScreen: {
                    bounceValue: new Animated.Value(1000),
                    isHidden: true
                }
            }

        case TOGGLE_SIDESCREEN:
            return {
                ...state,
                sideScreen: {
                    ...state.sideScreen,
                    isHidden: !state.sideScreen.isHidden
                }
            }

        case GET_SEARCH_TERM:
            return {
                ...state,
                search: {
                    term: payload
                }
            }

        case CLEAR_SEARCH: 
            return {
                ...state,
                search: {
                    term: ''
                }
            }

        case OPEN_CREATE_LIST:
            return {
                ...state,
                edit: {
                    editMode: 'createList',
                    editData: ['']
                }
            }

        case OPEN_EDIT_LIST:
            return {
                ...state,
                edit: {
                    editMode: 'editList',
                    editData: payload.editData,
                    editId: payload.editId
                }
            }

        case OPEN_CREATE_WORD: 
            return {
                ...state,
                edit: {
                    editMode: 'createWord',
                    editData: ['', ''],
                    editId: payload.editId
                }
            }

        case OPEN_EDIT_WORD:
            return {
                ...state,
                edit: {
                    editMode: 'editWord',
                    editData: payload.editData,
                    editId: payload.editId
                }
            }
        

        default:
            return {
                ...state
            }
    }
}
