import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import chore from './chore.reducer';
import allowance from './allowance.reducer';
import bank from './bank.reducer';
import bankTransaction from './bank.transaction.reducer';
import week from './week.reducer';
import chorePayment from './chore.payment.reducer';
import dashboard from './dashboard.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  allowance, //contains allowance and latestAllowance
  bank,
  bankTransaction,
  chore,
  week,
  chorePayment,
  dashboard,
});

export default rootReducer;