import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchWeek() {
    try {                
        const response = yield axios.get(`/api/week`);
        console.log('response for FETCH_WEEK is:', response.data); 
        yield put({ type: 'SET_WEEK', payload: response.data });
    } catch (error) {
        console.log('Week GET request failed', error);
    }
}

function* weekSaga() {
    yield takeLatest('FETCH_WEEK', fetchWeek);
}

export default weekSaga;