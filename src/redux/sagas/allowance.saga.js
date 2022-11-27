import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get allowance info from db
- update to monthly and weekly totals
- update boolean deposited values (to determine whether $ was paid to user)
*/

function* fetchLatestAllowance(action) {
    console.log('in fetchLatestAllowance saga!');
    try {
        yield put({ type: 'UNSET_LATEST_ALLOWANCE' });
        const response = yield axios.get(`/api/allowance/latest/${action.payload}`);
        console.log('==> fetchLatestAllowance response is:', response);
        yield put({ type: 'SET_LATEST_ALLOWANCE', payload: response.data });
    } catch (error) {
        console.log('Allowance GET LATEST request failed', error);
    }
}

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

function* fetchNextAllowanceInfo(action) {
    console.log('in getNextAllowanceInfo');
    try {
        const response = yield axios.get(`/api/allowance/next/${action.payload}`);
        console.log('===> fetchNextAllowanceInfo response is:', response);
        yield put({ type: 'SET_NEXT_ALLOWANCE_INFO', payload: response.date });
    } catch (error) {
        console.log('Allowance GET NEXT ALLOWANCE INFO request failed', error);
    }
}

function* updateAllowance(action) {
    console.log('in depositFlagSetToFalse & action is:', action);
    try {
        yield axios.put('/api/allowance/update-deposit-flag', action.payload);
        yield put({ type: 'UNSET_ALLOWANCE' });
        //yield put({ type: 'SET_LATEST_ALLOWANCE', payload: action.payload.updatedLatestAllowance });
        yield put({ type: 'UPDATE_ALLOWANCE_FLAG', payload: action.payload.depositedFlagColumn });
    } catch (error) {
        console.log('set deposit flag error is:', error);
    }
}

function* allowanceSaga() {
    yield takeLatest('FETCH_ALLOWANCE', fetchAllowance);
    yield takeLatest('GET_NEXT_ALLOWANCE_INFO', fetchNextAllowanceInfo);
    yield takeLatest('FETCH_LATEST_ALLOWANCE', fetchLatestAllowance);
    yield takeLatest('UPDATE_ALLOWANCE', updateAllowance);
}

export default allowanceSaga;