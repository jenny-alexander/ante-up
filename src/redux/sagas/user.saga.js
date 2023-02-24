import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    yield put({ type: 'CREATE_ALLOWANCE_RECORD', payload: response.data}); //NEW
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateUser(action) {
  console.log('in updateUser SAGA and action.payload is:', action.payload);
  try {
    yield axios.put('/api/user', action.payload);

    //now we need to send the updated user back to the app
    yield put({ type: 'SET_USER', payload: action.payload });
  }
  catch (error) {
    console.log(`Error updating user profile!`, error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_USER', updateUser);
}

export default userSaga;
