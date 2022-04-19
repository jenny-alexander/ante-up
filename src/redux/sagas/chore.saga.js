import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get chore
- create new chore
- delete a chore
- update comments on a chore
- move (update) a chore by moving it from 'daily' to 'weekly'
*/

function* fetchChore() {
    try {
        //yield put({ type: 'UNSET_CHORE' });
        const response = yield axios.get('/api/chore');
        yield put({ type: 'SET_CHORE', payload: response.data });
    } catch (error) {
        console.log('Chore GET request failed', error);
    }
}

function* choreSaga() {
    yield takeLatest('FETCH_CHORE', fetchChore);
}

export default choreSaga;