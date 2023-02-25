import { put, takeLatest, select, take } from 'redux-saga/effects';
import axios from 'axios';
import { getUserInfo } from '../reducers/user.reducer';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    const response = yield axios.post('/api/user/register', action.payload);
    console.log('*** id is:', response.data);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
    yield put({type:'CREATE_NEW_RECORDS'});
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* createNewRecords(action) {
  let stateSlice = yield select(getUserInfo);  
  while (Object.entries(stateSlice).length == 0 ) {
    yield take();
    stateSlice = yield select(getUserInfo);
  }
  yield put({ type: 'CREATE_ALLOWANCE_RECORD'});
  yield put({ type: 'CREATE_BANK_RECORD'});
  yield put({ type: 'SET_NEW_USER'});
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('CREATE_NEW_RECORDS', createNewRecords);
}

export default registrationSaga;