import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get allowance info from db
- update to monthly and weekly totals
- update boolean deposited values (to determine whether $ was paid to user)
*/

function* fetchAllowance(action) {
    console.log('in fetchAllowance saga!');
    try {
        yield put({ type: 'UNSET_ALLOWANCE' });
        console.log('in fetch allowance & action payload is:', action.payload);
        const response = yield axios.get(`/api/allowance/${action.payload}`);
        console.log('==> fetchAllowance response is:', response);
        yield put({ type: 'SET_ALLOWANCE', payload: response.data });
    } catch (error) {
        console.log('Allowance GET request failed', error);
    }
}

function* depositAllowance(action) {
    console.log('in depositAllowance in saga!');
    console.log('action is:', action);
    try {
        const response = yield axios.put(`/api/allowance/deposit`, action.payload);
        //yield put({ type: 'FETCH_MONEY', payload: response.data });
    } catch (error) {
        console.log('Allowance PUT (deposit) failed with:', error);
    }
}

function* allowanceSaga() {
    yield takeLatest('FETCH_ALLOWANCE', fetchAllowance);
    yield takeLatest('DEPOSIT_ALLOWANCE', depositAllowance);
}

export default allowanceSaga;