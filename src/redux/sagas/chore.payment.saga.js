import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get chore payments (daily, weekly, monthly, ad hoc)
- update chore payments
*/

function* fetchDailyPayment(action) {
    console.log('in fetchDailyPayment and action is:', action);
    try {        
        const response = yield axios.get(`/api/chore/payment/daily/${action.payload.userID}/${action.payload.weekID}` );
        yield put({ type: 'GET_DAILY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_DAILY_PAYMENT_FAILED', payload: error });
        console.log('Chore Daily Payment GET request failed', error);
    }
}

function* fetchWeeklyPayment(action) {
    try {        
        const response = yield axios.get(`/api/chore/payment/weekly/${action.payload}`);
        yield put({ type: 'GET_WEEKLY_PAYMENT_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_WEEKLY_PAYMENT_FAILED', payload: error });
        console.log('Chore Weekly Payment GET request failed', error);
    }
}

function* chorePaymentSaga() {
    yield takeLatest('GET_DAILY_PAYMENT_REQUESTED', fetchDailyPayment);
    yield takeLatest('GET_WEEKLY_PAYMENT_REQUESTED', fetchWeeklyPayment);     
}

export default chorePaymentSaga;