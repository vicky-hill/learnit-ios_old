import api from '../utils/api';

import {
    GET_REVIEW_SUCCESS,
    GET_EMPTY_REVIEW,
    CORRECT_ANSWER,
    CLEAR_REVIEW,
    GET_NEXT_WORD,
    INCORRECT_ANSWER
} from '../actions/types';


/* ===================================
   Get words that need to be reviewed
=================================== */
export const getReview = (ranking) => async dispatch => {
    try {

        // Review opened from ranking, pass in rankWords
        if (ranking) {
            return dispatch({
                type: GET_REVIEW_SUCCESS,
                payload: ranking
            })
        }

        // General review, gets dueDate words from db
        const res = await api.get('/words/review');

        if (res.data.length === 0) {
            return dispatch({
                type: GET_EMPTY_REVIEW
            })
        }

        dispatch({
            type: GET_REVIEW_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
    }
}


/* ===================================
   Check correct word
=================================== */
export const checkAnswer = (answer, word, id) => async (dispatch, getState) => {

    // Correct Word
    if (answer.trim() === word && answer !== ''  && answer !== ' ' + word + ' ') {

        dispatch({
            type: CORRECT_ANSWER,
            payload: { word, id }
        })

        const body = {
            rating: getState().review.currentWord.rating + 1,
            dueDate: getNewDuedate(getState().review.currentWord.rating)
        }

        // Update word in database
        await api.put(`/words/${id}`, body);

        getNextWord(dispatch, getState, true); 
    }
}

export const showAnswer = (answer, word, id) => (dispatch, getState) => {
    if (answer !== word) {

        dispatch({
            type: INCORRECT_ANSWER,
            payload: id
        })

        getNextWord(dispatch, getState, false);
    }

}


/* ===================================
   Get next word
=================================== */
const getNextWord = (dispatch, getState, correct) => {
    // Wait two seconds, then load next word
    setTimeout(() => {

        // Get updated list without correct word
        const updatedList = getState().review.list;

        // If updated list is empty, end review
        if (updatedList.length === 0) {

            return dispatch({
                type: CLEAR_REVIEW
            })
        }

        // Get next random word from list
        const randomIndex = Math.floor(Math.random() * updatedList.length);
        const nextWord = updatedList[randomIndex]

        dispatch({
            type: GET_NEXT_WORD,
            payload: nextWord
        })
    }, !correct ? 2000 : 1000);
}


/* ===================================
   Get new due date
=================================== */
const getNewDuedate = (rating) => {
    let newDate = new Date();

    switch (rating) {
        case 0:
            newDate.setHours(newDate.getHours() + 7);
            return newDate;
        case 1:
            newDate.setHours(newDate.getHours() + 14);
            return newDate;
        case 2:
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        case 3:
            newDate.setDate(newDate.getDate() + 3);
            return newDate;
        case 4:
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        case 5:
            newDate.setDate(newDate.getDate() + 14);
            return newDate;
        case 6:
            newDate.setDate(newDate.getDate() + 21);
            return newDate;
        case 7:
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        case 8:
            newDate.setMonth(newDate.getMonth() + 2);
            return newDate;
        case 9:
            newDate.setMonth(newDate.getMonth() + 3);
            return newDate;
        case 10:
            newDate.setMonth(newDate.getMonth() + 4);
            return newDate;
        case 11:
            newDate.setMonth(newDate.getMonth() + 5);
            return newDate;
        case 12:
            newDate.setMonth(newDate.getMonth() + 6);
            return newDate;
        case 13:
            newDate.setMonth(newDate.getMonth() + 7);
            return newDate;
        case 14:
            newDate.setMonth(newDate.getMonth() + 8);
            return newDate;
        case 15:
            newDate.setMonth(newDate.getMonth() + 9);
            return newDate;
        case 16:
            newDate.setMonth(newDate.getMonth() + 10);
            return newDate;
        case 17:
            newDate.setMonth(newDate.getMonth() + 11);
            return newDate;
        case 18:
            newDate.setMonth(newDate.getMonth() + 12);
            return newDate;
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
            newDate.setMonth(newDate.getMonth() + 12);
            return newDate;
    }
}
