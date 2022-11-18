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

// function* fetchTotalBank(action) {
//     console.log('in fetchTotalBank and action is:', action);
//     try {
//         const response = yield axios.get(`/api/bank/total/${action.payload}`);
//         console.log('==> fetchTotalBank response is:', response);
//         yield put({ type: 'GET_TOTAL_BANK_SUCCESS', payload: response.data });
//     } catch (error) {
//         console.log('in bank saga and fetch total bank error is:', error);
//     }
// }

function* depositBank(action) {
    console.log('in depositBank in saga!');
    console.log('action is:', action);
    yield put({ type: 'CLEAR_DEPOSIT_SUCCESS' }); //clear successul deposit flag
    try {
        const response = yield axios.put(`/api/bank/deposit`, action.payload);
        console.log('==> fetchBank response is:', response);
        //yield put({ type: 'UPDATE_ALLOWANCE', payload: action.payload })
        yield put({ type: 'DEPOSIT_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Bank PUT (deposit) failed with:', error);
        yield put({ type: 'GET_BANK_FAILED', payload: error })
    }
}

function* bankSaga() {
    yield takeLatest('FETCH_BANK', fetchBank);
    yield takeLatest('DEPOSIT_BANK', depositBank);
    yield takeLatest('GET_BANK_REQUESTED', fetchBank);
    // yield takeLatest('GET_TOTAL_BANK', fetchTotalBank);
}

export default bankSaga;