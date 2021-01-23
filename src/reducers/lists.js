import {
    GET_LISTS,
    SAVE_LIST_SUCCESS,
    SAVE_LIST_FAIL,
    DELETE_LIST_SUCCESS,
    UPDATE_LIST_SUCCESS
} from '../actions/types';

const initialState = {
    lists: [],
    error: '',
    loading: true
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case GET_LISTS:
            return {
                ...state,
                loading: false,
                lists: payload
            }

        case SAVE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                lists: [payload, ...state.lists]
            }

        case SAVE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }

        case UPDATE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                lists: state.lists.map(list => {
                    return list._id !== payload._id ? list : payload
                })
            }

        case DELETE_LIST_SUCCESS:
            return {
                ...state,
                lists: state.lists.filter(list => {
                    return list._id !== payload._id
                })
            }

        default:
            return {
                ...state
            }
    }
}
