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
        console.log('==> depositBank response is:', response);
        //yield put({ type: 'UPDATE_ALLOWANCE', payload: action.payload })
        if (action.payload.allowanceDeposit) {
            yield put({ type: 'ALLOWANCE_DEPOSIT_SUCCESS', payload: response.data });
        } else {
            yield put({ type: 'DEPOSIT_SUCCESS', payload: response.data });
        }

    } catch (error) {
        console.log('Bank PUT (deposit) failed with:', error);
        yield put({ type: 'GET_BANK_FAILED', payload: error })
    }
}

function* addBankTransaction(action) {
    console.log('in updateBankTransaction in saga!');
    console.log('action is:', action);
    try {
        const response = yield axios.post(`/api/bank/add-transaction`, action.payload);
        console.log('==> addBankTxn response is:', response);
    } catch (error) {
        console.log('Bank POST new transaction failed with error:', error);

    }
}

function* saveBankGoal(action) {
    console.log('in saveBankGoal in bank.saga.js & action is:', action);
    try {
        const response = yield axios.post(`api/bank/save-goal`, action.payload);
    } catch (error) {
        console.log('UPDATE for BankGoal failed');
    }
}

function* bankSaga() {
    yield takeLatest('FETCH_BANK', fetchBank);
    yield takeLatest('CHANGE_BANK', depositBank);
    yield takeLatest('GET_BANK_REQUESTED', fetchBank);
    yield takeLatest('SAVE_BANK_GOAL', saveBankGoal);
    //yield takeLatest('ADD_BANK_TRANSACTION', addBankTransaction);
    // yield takeLatest('GET_TOTAL_BANK', fetchTotalBank);
}

export default bankSaga;