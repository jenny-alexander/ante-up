import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get chore payments (daily, weekly, monthly, ad hoc)
- update chore payments
*/
function* fetchDailyPayment(action) {    
    console.log('getting daily payments')
    try {        
        const response = yield axios.get(`/api/chore/payment/daily/${action.payload.userID}/${action.payload.weekID}` );
        yield put({ type: 'GET_DAILY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_DAILY_PAYMENT_FAILED', payload: error });        
    }
}

function* updateDailyPayment(action) {    
    try {          
        console.log('+++ ACTION payload is:', action.payload)      
        const response = yield axios.put(`/api/chore/payment/daily`, action.payload);   
        //yield put({ type: 'GET_DAILY_PAYMENT_REQUESTED', payload: action.payload });     
    } catch (error) {
        yield put({ type: 'PUT_DAILY_PAYMENT_FAILED', payload: error });        
    }
}

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

function* addChorePayment(action) {
    console.log('in addChorePayment saga and action is:', action);
    try {        
        const response = yield axios.post(`/api/chore/payment/add`, action.payload);
        yield put({ type: 'ADD_CHORE_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'ADD_CHORE_PAYMENT_FAILED', payload: error });
        console.log('Chore POST request failed', error);
    }
}

function* chorePaymentSaga() {
    yield takeLatest('GET_DAILY_PAYMENT_REQUESTED', fetchDailyPayment);
    yield takeLatest('GET_WEEKLY_PAYMENT_REQUESTED', fetchWeeklyPayment);
    yield takeLatest('GET_ADHOC_PAYMENT_REQUESTED', fetchAdhocPayment);
    yield takeLatest('ADD_CHORE_PAYMENT', addChorePayment);
    // yield takeLatest('REMOVE_CHORE_PAYMENT', removeChorePayment);
    yield takeLatest('UPDATE_DAILY_PAYMENT', updateDailyPayment);
    yield takeLatest('UPDATE_WEEKLY_PAYMENT', updateWeeklyPayment);
    yield takeLatest('UPDATE_ADHOC_PAYMENT', updateAdhocPayment);
}

export default chorePaymentSaga;