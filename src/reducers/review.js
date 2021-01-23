import {
    GET_REVIEW_SUCCESS,
    GET_EMPTY_REVIEW,
    CORRECT_ANSWER,
    CLEAR_REVIEW,
    GET_NEXT_WORD,
    INCORRECT_ANSWER
} from '../actions/types';

const initialState = {
    list: [],
    loading: true,
    correct: false,
    incorrect: false,
    currentWord: {
        word: '',
        translation: '',
        id: null,
        dueDate: '',
        rating: null
    }
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        
        case GET_REVIEW_SUCCESS:
            
            // Extract first word from review list
            const { english, spanish, _id, dueDate, rating } = payload[0];

            return {
                ...state,
                list: payload,
                loading: false,
                currentWord: {
                    word: spanish,
                    translation: english,
                    id: _id,
                    dueDate: dueDate,
                    rating: rating
                }
            }

        case GET_EMPTY_REVIEW: 
            return {
                ...state,
                list: [],
                loading: false
            }

        
        case CORRECT_ANSWER:
            return {
                ...state,
                correct: true,
                // Remove correct word from review list
                list: state.list.filter(item => item.spanish !== payload.word)
            }

        case INCORRECT_ANSWER: 
  
            // Update incorrect word in list, change rating to 0
            return {
                ...state,
                incorrect: true,
                list: state.list.map(word => {
                    if(word._id !== payload) {
                        return word
                    } else {
                        const incorrectWord = state.list.find(word => word._id === payload);
                        return {
                            ...incorrectWord,
                            rating: 0
                        }
                    }
                })
            }
            

        case GET_NEXT_WORD:
            
            return {
                ...state,
                correct: false,
                incorrect: false,
                currentWord: {
                    word: payload.spanish,
                    translation: payload.english,
                    id: payload._id,
                    dueDate: payload.dueDate,
                    rating: payload.rating
                }
            }

        case CLEAR_REVIEW: 
            return {
                ...state,
                correct: false,
                incorrect: false,
            }

        

        default: 
            return {
                ...state
            };
    }
}