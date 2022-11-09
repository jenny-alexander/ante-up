import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBank(action) {
    console.log('in fetchBank saga!');
    try {
        yield put({ type: 'UNSET_BANK' });
        console.log('in fetch bank & action payload is:', action.payload);
        const response = yield axios.get(`/api/bank/${action.payload}`);
        console.log('==> fetchBank response is:', response);
        yield put({ type: 'SET_BANK', payload: response.data });
    } catch (error) {
        console.log('Bank GET request failed', error);
    }
}

function* bankSaga() {
    yield takeLatest('FETCH_BANK', fetchBank);
    // yield takeLatest('DEPOSIT_BANK', depositBank);
}

export default bankSaga;