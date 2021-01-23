import { combineReducers } from 'redux';
import auth from './auth';
import words from './words';
import utils from './utils';
import lists from './lists';
import review from './review';
import alerts from './alerts';

export default combineReducers({
    auth,
    words,
    utils,
    lists,
    review,
    alerts
});