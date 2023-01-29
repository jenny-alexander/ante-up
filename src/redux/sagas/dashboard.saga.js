import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTotalDailyChorePayment(action) { 
    try {        
        const response = yield axios.get(`/api/chore/payment/daily/total/${action.payload.userID}/${action.payload.weekID}`);        
        yield put({ type: 'GET_TOTAL_DAILY_CHORE_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_TOTAL_DAILY_CHORE_PAYMENT_FAILED', payload: error });        
    }
}

function* fetchTotalWeeklyChorePayment(action) {    
    try {        
        const response = yield axios.get(`/api/chore/payment/weekly/total/${action.payload.userID}/${action.payload.weekID}`);        
        yield put({ type: 'GET_TOTAL_WEEKLY_CHORE_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_TOTAL_WEEKLY_CHORE_PAYMENT_FAILED', payload: error });        
    }
}

function* fetchIndividualChorePayment(action) {    
    try {        
        const response = yield axios.get(`/api/dashboard/payment/individual/${action.payload.userID}/${action.payload.weekID}`);
        yield put({ type: 'GET_INDIVIDUAL_CHORE_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_INDIVIDUAL_CHORE_PAYMENT_FAILED', payload: error });        
    }
}

function* dashboardSaga() {
    yield takeLatest('GET_TOTAL_DAILY_CHORE_PAYMENT', fetchTotalDailyChorePayment);
    yield takeLatest('GET_TOTAL_WEEKLY_CHORE_PAYMENT', fetchTotalWeeklyChorePayment);
    yield takeLatest('GET_INDIVIDUAL_CHORE_PAYMENT', fetchIndividualChorePayment);
}

export default dashboardSaga;