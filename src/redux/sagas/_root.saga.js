import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import choreSaga from './chore.saga';
import allowanceSaga from './allowance.saga';
import bankSaga from './bank.saga';
import bankTransactionSaga from './bank.transaction.saga';
import weekSaga from './week.saga';
import chorePaymentSaga from './chore.payment.saga';
import dashboardSaga from './dashboard.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    choreSaga(),
    allowanceSaga(),
    bankSaga(),
    bankTransactionSaga(),
    weekSaga(),
    chorePaymentSaga(),
    dashboardSaga(),
  ]);
}
