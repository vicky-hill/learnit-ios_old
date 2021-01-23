import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USER_SUCCESS,
    SIGN_OUT, 
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: '',
    isAuthenticated: false,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS: 
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                user: payload
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                token: '',
                isAuthenticated: false
            }


        case SIGN_OUT:
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                user: null
            }

        default:     
            return {
                ...state
            }
    }
}
