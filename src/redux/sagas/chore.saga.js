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
        const response = yield axios.get(`/api/chore/${action.payload}`);
        yield put({ type: 'GET_CHORE_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_CHORE_FAILED', payload: error });
        console.log('Chore GET request failed', error);
    }
}

function* addChore(action) {
    console.log('in addChore with action.payload:', action.payload);
    try {
        const response = yield axios.post(`/api/chore/add`, action.payload);
        yield put({ type:'GET_CHORE_REQUESTED', payload: action.payload.userID });
    } catch (error) {
        console.log('Chore POST new chore failed with error:', error);
    }
}

function* choreSaga() {
    yield takeLatest('GET_CHORE_REQUESTED', fetchChore);
    yield takeLatest('ADD_CHORE', addChore);
}

export default choreSaga;