import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchBank(action) {
    try {
        yield put({ type: 'UNSET_BANK' });
        const response = yield axios.get(`/api/bank/${action.payload}`);
        yield put({ type: 'GET_BANK_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Bank GET request failed', error);
        yield put({ type: 'GET_BANK_FAILED', payload: error })
    }
}

function* depositBank(action) {
    yield put({ type: 'CLEAR_DEPOSIT_SUCCESS' }); //clear successul deposit flag
    try {
        const response = yield axios.put(`/api/bank/deposit`, action.payload);
        if (action.payload.allowanceDeposit) {
            yield put({ type: 'ALLOWANCE_DEPOSIT_SUCCESS', payload: response.data });
        } else {
            yield put({ type: 'DEPOSIT_SUCCESS', payload: response.data });
        }

    } catch (error) {
        console.log('Bank PUT (deposit) failed with:', error);
        yield put({ type: 'GET_BANK_FAILED', payload: error }) //TODO: CHECK THIS!
    }
}

function* saveBankGoal(action) {
    try {
        const response = yield axios.put(`api/bank/save-goal`, action.payload);
    } catch (error) {
        console.log('UPDATE for BankGoal failed');
    }
}

function* clearDepositSuccess(action) {
    try {
        yield put({ type: 'CLEAR_DEPOSIT_SUCCESS' });
    } 
    catch(error){
        console.log('Problem clearing deposit success:', error);
    }
    
}

function* bankSaga() {
    yield takeLatest('FETCH_BANK', fetchBank);
    yield takeLatest('CHANGE_BANK', depositBank);
    yield takeLatest('GET_BANK_REQUESTED', fetchBank);
    yield takeLatest('SAVE_BANK_GOAL', saveBankGoal);
    yield takeLatest('CLEAR_DEPOSIT_SUCCESS_FLAG', clearDepositSuccess);    
}

export default bankSaga;