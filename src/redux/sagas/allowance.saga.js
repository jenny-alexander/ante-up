import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get allowance info from db
- update to monthly and weekly totals
- update boolean deposited values (to determine whether $ was paid to user)
*/

function* createNewAllowanceRecord(action)
 {
    try {
        //yield put({ type: 'UNSET_ALLOWANCE_RECORD'});
        //action.payload should include: age, week_id, allowance date.
        
        const response = yield axios.post(`api/allowance/create`, action.payload);

    } catch(error) {
        console.log('Allowance CREATE NEW RECORD failed:', error);
    }
 }
function* fetchLatestAllowance(action) {
    // console.log('action is:', action);
    try {
        yield put({ type: 'UNSET_LATEST_ALLOWANCE' });
        const response = yield axios.get(`/api/allowance/latest/${action.payload.userId}/${action.payload.weekId}`);        
        yield put({ type: 'SET_LATEST_ALLOWANCE', payload: response.data });
    } catch (error) {
        console.log('Allowance GET LATEST request failed', error);
    }
}

// function* fetchAllowance(action) {
//     try {
//         yield put({ type: 'UNSET_ALLOWANCE' });
//         const response = yield axios.get(`/api/allowance/${action.payload}`);
//         yield put({ type: 'SET_ALLOWANCE', payload: response.data });
//     } catch (error) {
//         console.log('Allowance GET request failed', error);
//     }
// }

function* fetchNextAllowanceInfo(action) {
    try {
        const response = yield axios.get(`/api/allowance/next/${action.payload}`);
        yield put({ type: 'SET_NEXT_ALLOWANCE', payload: response.data });
    } catch (error) {
        console.log('Allowance GET NEXT ALLOWANCE INFO request failed', error);
    }
}

function* updateAllowance(action) {
    try {
        yield axios.put('/api/allowance/update-deposit-flag', action.payload);
        yield put({ type: 'UNSET_ALLOWANCE' });
        yield put({ type: 'UPDATE_ALLOWANCE_FLAG', payload: action.payload.depositedFlagColumn });
    } catch (error) {
        console.log('set deposit flag error is:', error);
    }
}

function* allowanceSaga() {
    //yield takeLatest('FETCH_ALLOWANCE', fetchAllowance);
    yield takeLatest('GET_NEXT_ALLOWANCE_INFO', fetchNextAllowanceInfo);
    yield takeLatest('FETCH_LATEST_ALLOWANCE', fetchLatestAllowance);
    yield takeLatest('UPDATE_ALLOWANCE', updateAllowance);
}

export default allowanceSaga;