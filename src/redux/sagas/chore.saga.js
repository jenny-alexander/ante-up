import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* api functionality should include:
- get chore
- create new chore
- update chore (comments, status)
*/

function* fetchUserChore(action) {
    try {
        const response = yield axios.get(`/api/chore/${action.payload.userId}/${action.payload.weekId}`);
        yield put({ type: 'GET_CHORE_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_CHORE_FAILED', payload: error });
        console.log('Chore GET request failed', error);
    }
}

function* assignChore(action) {
    try {
        const response = yield axios.post(`/api/chore/assign`, action.payload);
        yield put({ type: 'ASSIGN_CHORE_SUCCESS', payload: response.data });
        yield put({ type: 'ADD_CHORE_PAYMENT', payload: { ...action.payload, 'user_chore_id': response.data[0]?.user_chore_id } });
    } catch (error) {
        yield put({ type: 'ASSIGN_CHORE_FAILED', payload: error });
        console.log('Chore POST request failed', error);
    }
}

function* removeChore(action) {
    try {
        const response = yield axios.delete(`/api/chore/remove/${action.payload.userChoreId}`);
        yield put({ type: 'REMOVE_CHORE_PAYMENT', payload: { id: action.payload.userChoreId, frequency: action.payload.frequency } });
        yield put({ type: 'GET_USER_CHORE_REQUESTED', payload: action.payload });

    } catch (error) {
        yield put({ type: 'REMOVE_CHORE_FAILED', payload: error });
        console.log('Chore DELETE request failed', error);
    }
}
function* fetchAllChores(action) {
    try {
        const response = yield axios.get(`/api/chore/${action.payload.userId}`);
        yield put({ type: 'GET_ALL_CHORES_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'GET_ALL_CHORES_FAILED', payload: error });
        console.log('Chore GET ALL CHORE request failed', error);
    }
}

function* addChore(action) {
    try {
        const response = yield axios.post(`/api/chore/add`, action.payload);
        if (action.payload.assignToUser) {
            yield put({
                type: 'ASSIGN_CHORE_TO_USER',
                payload: {
                    userId: action.payload.userId,
                    weekID: action.payload.weekID,
                    choreId: response.data,
                    frequency: action.payload.choreFrequency.split(" ").join(""),
                }
            })
        }
        yield put({ type: 'ADD_CHORE_SUCCESS' });
        yield put({ type: 'GET_ALL_CHORE_REQUESTED', payload: { userId: action.payload.userId } });
    } catch (error) {
        console.log('Chore POST new chore failed with error:', error);
    }
}

function* deleteChore(action) {
    try {
        const response = yield axios.delete(`/api/chore/delete/${action.payload.choreId}`);
        yield put({ type: 'DELETE_CHORE_SUCCESS', payload: { choreId: action.payload.choreId } });
    } catch (error) {
        yield put({ type: 'REMOVE_CHORE_FAILED', payload: error });
        console.log('Chore DELETE request failed', error);
    }
}

function* updateChore(action) {
    try {
        const response = yield axios.put(`api/chore/update`, action.payload);
        yield put({
            type: 'UPDATE_CHORE_SUCCESS',
            payload: {
                choreId: action.payload.choreId,
                choreName: action.payload.choreName,
                chorePayment: action.payload.chorePayment,
                choreFrequency: action.payload.choreFrequency,
            }
        });
    } catch (error) {
        console.log('UPDATE for Chore failed, error is:', error);
    }
}

function* choreSaga() {
    yield takeLatest('GET_USER_CHORE_REQUESTED', fetchUserChore);
    yield takeLatest('GET_ALL_CHORE_REQUESTED', fetchAllChores);
    yield takeLatest('ASSIGN_CHORE_TO_USER', assignChore);
    yield takeLatest('REMOVE_CHORE_FROM_USER', removeChore);
    yield takeLatest('ADD_NEW_CHORE', addChore);
    yield takeLatest('UPDATE_CHORE', updateChore);
    yield takeLatest('DELETE_CHORE', deleteChore);
}

export default choreSaga;