import {
    SET_ERROR,
    CLEAR_ERROR
} from '../actions/types';

const initialState = {
    error: ''
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case SET_ERROR: 
            return {
                ...state,
                error: payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: ''
            }

        default: 
            return state
    }
}