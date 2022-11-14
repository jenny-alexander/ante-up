import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchBank(action) {
    console.log('in fetchBank saga! and action is:', action);
    try {
        yield put({ type: 'UNSET_BANK' });
        console.log('in fetch bank & action payload is:', action.payload);
        const response = yield axios.get(`/api/bank/${action.payload}`);
        console.log('==> fetchBank response is:', response);
        yield put({ type: 'GET_BANK_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Bank GET request failed', error);
        yield put({ type: 'GET_BANK_FAILED', payload: error })
    }
}

function* depositBank(action) {
    console.log('in depositBank in saga!');
    console.log('action is:', action);
    try {
        const response = yield axios.put(`/api/bank/deposit`, action.payload);
        console.log('==> fetchBank response is:', response);
        yield put({ type: 'GET_BANK_SUCCESS', payload: response.data });
        //const response = yield call(axios.put(`/api/bank/deposit`), action.payload);
    } catch (error) {
        console.log('Bank PUT (deposit) failed with:', error);
        yield put({ type: 'GET_BANK_FAILED', payload: error })

    }
}

function* bankSaga() {
    yield takeLatest('FETCH_BANK', fetchBank);
    yield takeLatest('DEPOSIT_BANK', depositBank);
    yield takeLatest("GET_BANK_REQUESTED", fetchBank)
}

export default bankSaga;