import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get chore payments (daily, weekly, monthly, ad hoc)
- update chore payments
*/

/* WEEKLY PAYMENT */

function* fetchDailyPayment(action) {    
    try {        
        const response = yield axios.get(`/api/chore/payment/daily/${action.payload.userID}/${action.payload.weekID}` );
        yield put({ type: 'GET_DAILY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_DAILY_PAYMENT_FAILED', payload: error });        
    }
}

function* updateDailyPayment(action) {    
    try {                
        const response = yield axios.put(`/api/chore/payment/daily`, action.payload);        
        //yield put({ type: 'PUT_DAILY_PAYMENT_SUCCESS', payload: response.data });        
        //yield put({ type: 'SET_TOTAL_DAILY_CHORE_PAYMENT', payload: action.payload.totalPayment})
    } catch (error) {
        yield put({ type: 'PUT_DAILY_PAYMENT_FAILED', payload: error });        
    }
}

// function* fetchTotalDailyChorePayment(action) {    
//     try {        
//         const response = yield axios.get(`/api/chore/payment/daily/total/${action.payload.userID}/${action.payload.weekID}`);        
//         //yield put({ type: 'GET_TOTAL_DAILY_CHORE_PAYMENT_SUCCESS', payload: response.data });
//     } catch (error) {
//         yield put({ type: 'GET_TOTAL_DAILY_CHORE_PAYMENT_FAILED', payload: error });        
//     }
// }

/* WEEKLY PAYMENT */
function* fetchWeeklyPayment(action) {
    try {        
        const response = yield axios.get(`/api/chore/payment/weekly/${action.payload.userID}/${action.payload.weekID}`);
        yield put({ type: 'GET_WEEKLY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_WEEKLY_PAYMENT_FAILED', payload: error });        
    }
}

function* updateWeeklyPayment(action) {    
    try {
        const response = yield axios.put(`/api/chore/payment/weekly`, action.payload);
        //yield put({ type: 'PUT_WEEKLY_PAYMENT_SUCCESS', payload: response.data });
        //yield put({ type: 'SET_TOTAL_WEEKLY_CHORE_PAYMENT', payload: action.payload.totalPayment})
    } catch (error) {
        yield put({ type: 'PUT_WEEKLY_PAYMENT_FAILED', payload: error });        
    }
}

function* fetchAdhocPayment(action) {
    try {        
        const response = yield axios.get(`/api/chore/payment/adhoc/${action.payload.userID}/${action.payload.weekID}`);
        yield put({ type: 'GET_ADHOC_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_ADHOC_PAYMENT_FAILED', payload: error });        
    }
}

function* updateAdhocPayment(action) {    
    console.log('updateAdHocPayment action is:', action);
    try {
        const response = yield axios.put(`/api/chore/payment/adhoc`, action.payload);
    } catch (error) {
        yield put({ type: 'PUT_ADHOC_PAYMENT_FAILED', payload: error });        
    }
}


// function* fetchTotalWeeklyChorePayment(action) {    
//     try {        
//         const response = yield axios.get(`/api/chore/payment/weekly/total/${action.payload.userID}/${action.payload.weekID}`);        
//         //yield put({ type: 'GET_TOTAL_WEEKLY_CHORE_PAYMENT_SUCCESS', payload: response.data });
//     } catch (error) {
//         yield put({ type: 'GET_TOTAL_WEEKLY_CHORE_PAYMENT_FAILED', payload: error });        
//     }
// }


function* chorePaymentSaga() {
    yield takeLatest('GET_DAILY_PAYMENT_REQUESTED', fetchDailyPayment);
    yield takeLatest('GET_WEEKLY_PAYMENT_REQUESTED', fetchWeeklyPayment);
    yield takeLatest('GET_ADHOC_PAYMENT_REQUESTED', fetchAdhocPayment);
    yield takeLatest('UPDATE_DAILY_PAYMENT', updateDailyPayment);
    yield takeLatest('UPDATE_WEEKLY_PAYMENT', updateWeeklyPayment);
    yield takeLatest('UPDATE_ADHOC_PAYMENT', updateAdhocPayment);
    // yield takeLatest('GET_TOTAL_DAILY_CHORE_PAYMENT', fetchTotalDailyChorePayment);
    // yield takeLatest('GET_TOTAL_WEEKLY_CHORE_PAYMENT', fetchTotalWeeklyChorePayment);
}

export default chorePaymentSaga;