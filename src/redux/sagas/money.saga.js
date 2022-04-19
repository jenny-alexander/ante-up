import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get money/allowance info from db
- update to monthly and weekly totals
- update boolean deposited values (to determine whether $ was paid to user)
*/

function* fetchMoney() {
    try {
        //yield put({ type: 'UNSET_MONEY' });
        const response = yield axios.get('/api/money');
        yield put({ type: 'SET_MONEY', payload: response.data });
    } catch (error) {
        console.log('Money GET request failed', error);
    }
}

function* moneySaga() {
    yield takeLatest('FETCH_MONEY', fetchMoney);
}

export default moneySaga;