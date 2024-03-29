const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const allowanceRouter = require('./routes/allowance.router');
const bankTransactionRouter = require('./routes/bank.transaction.router');
const choreRouter = require('./routes/chore.router');
const bankRouter = require('./routes/bank.router');
const weekRouter = require('./routes/week.router');
const chorePaymentRouter = require('./routes/chore.payment.router');
const dashboardRouter = require('./routes/dashboard.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/allowance', allowanceRouter);
app.use('/api/bank/transaction', bankTransactionRouter);
app.use('/api/bank', bankRouter);
app.use('/api/chore', choreRouter);
app.use('/api/week', weekRouter);
app.use('/api/chore/payment', chorePaymentRouter);
app.use('/api/dashboard', dashboardRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});