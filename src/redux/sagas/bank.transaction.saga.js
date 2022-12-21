import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* addBankTransaction(action) {
    try {
        const response = yield axios.post(`/api/bank/transaction/add`, action.payload);
    } catch (error) {
        console.log('Bank POST new transaction failed with error:', error);

    }
}

function* getLastBankTransaction(action) {
    try {
        //get last bank transaction
        const response = yield axios.get(`/api/bank/transaction/${action.payload}`)
        yield put({ type: 'GET_BANK_TRANSACTION_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('GET LATEST BANK transaction failed', error);
    }
}

function* bankTransactionSaga() {
    yield takeLatest('ADD_BANK_TRANSACTION', addBankTransaction);
    yield takeLatest('GET_LAST_BANK_TRANSACTION', getLastBankTransaction);
}

export default bankTransactionSaga;