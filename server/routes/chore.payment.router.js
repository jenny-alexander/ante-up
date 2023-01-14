const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/daily/:userID/:weekID', (req, res) => {
  // GET route code here
  console.log('ABOUT TO CALL DAILY QUERY FOR PAYMENT AND req is:', req.params);
  const dailyPaymentQuery = `SELECT * FROM chore_payment_daily
                        WHERE user_id = ${req.params.userID}
                        AND week_id = ${req.params.weekID};`;
  console.log('dailyPaymentQuery is:', dailyPaymentQuery);
  pool.query(dailyPaymentQuery)
    .then((results) => {
      console.log('results from get daily chore payment are:', results.rows);
      res.send(results.rows);
    }).catch((error) => {
      console.log('GET daily chore payment records from server error is:', error);
    })
});

router.get('/weekly/:userID/:weekID', (req, res) => {
  // GET route code here
  console.log('ABOUT TO CALL WEEKLY QUERY FOR PAYMENT AND req is:', req.params);
  const weeklyPaymentQuery = `SELECT * FROM chore_payment_weekly
                        WHERE user_id = ${req.params.userID}
                        AND week_id = ${req.params.weekID};`;
  console.log('weeklyPaymentQuery is:', weeklyPaymentQuery);
  pool.query(weeklyPaymentQuery)
    .then((results) => {
      console.log('results from get weekly chore payment are:', results.rows);
      res.send(results.rows);
    }).catch((error) => {
      console.log('GET weekly chore payment records from server error is:', error);
    })
});

/**
 * PUT route
 */


module.exports = router;
