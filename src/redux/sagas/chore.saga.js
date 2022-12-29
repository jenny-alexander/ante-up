import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get chore
- create new chore
- update chore (comments, status)
*/

function* fetchChore(action) {
    try {
        //yield put({ type: 'UNSET_CHORE' });
        console.log('in fetchChore saga and action.payload is:', action.payload)
        const response = yield axios.get(`/api/chore/${action.payload}`);
        yield put({ type: 'GET_CHORE_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Chore GET request failed', error);
    }
}

function* choreSaga() {
    yield takeLatest('GET_CHORE_REQUESTED', fetchChore);
}

export default choreSaga;