import {
    SET_ERROR,
    CLEAR_ERROR
} from './types';


/* ===================================
   Set Error 
=================================== */
export const setError = (errorMessage) => dispatch => {
    dispatch({
        type: SET_ERROR,
        payload: errorMessage
    })

    setTimeout(() => {
        dispatch({
            type: CLEAR_ERROR
        })
    }, 3000);
}


/* ===================================
   Clear Error
=================================== */
export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR
    })
}