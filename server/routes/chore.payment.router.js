const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/daily/:userID/:weekID', (req, res) => {
  const dailyPaymentQuery = `SELECT * FROM chore_payment_daily
                        WHERE user_id = ${req.params.userID}
                        AND week_id = ${req.params.weekID};`;  
  pool.query(dailyPaymentQuery)
    .then((results) => {      
      res.send(results.rows);
    }).catch((error) => {
    })
});

router.get('/weekly/:userID/:weekID', (req, res) => {
  const weeklyPaymentQuery = `SELECT * FROM chore_payment_weekly
                        WHERE user_id = ${req.params.userID}
                        AND week_id = ${req.params.weekID};`;
  pool.query(weeklyPaymentQuery)
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      console.log('SELECT weekly chore payment error is:', error);
    })
});

router.get('/daily/total/:userID/:weekID', (req, res) => {  
  const dailyTotalQuery = `SELECT SUM (total_payment) AS total_daily_chore FROM chore_payment_daily
                        WHERE user_id = ${req.params.userID}
                        AND week_id = ${req.params.weekID};`;                        
  pool.query(dailyTotalQuery)
    .then((results) => {
      res.send(results?.rows[0]?.total_daily_chore);
    }).catch((error) => {
      console.log('SELECT daily total chore payment error is:', error);
    })
});

router.get('/weekly/total/:userID/:weekID', (req, res) => {  
  const weeklyTotalQuery = `SELECT SUM (total_payment) AS total_weekly_chore FROM chore_payment_weekly
                             WHERE user_id = ${req.params.userID}
                             AND week_id = ${req.params.weekID};`;                             
  pool.query(weeklyTotalQuery)
    .then((results) => {      
      res.send(results?.rows[0]?.total_weekly_chore);
    }).catch((error) => {
      console.log('SELECT weekly total chore payment error is:', error);
    })
});

/**
 * UPDATE DAILY PAYMENT
 */
router.put('/daily', (req, res) => {
  let updateDailyPaymentQuery = 'UPDATE chore_payment_daily SET ';

  Object.entries(req.body.schedule).forEach(([key, value]) => {
    updateDailyPaymentQuery += `${key} = ${value},`;
  });
  updateDailyPaymentQuery += `total_payment = ${req.body.totalPayment} WHERE id = ${req.body.id};`;
  
  pool.query(updateDailyPaymentQuery)
    .then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('Update daily payment error is:', error);
      res.sendStatus(500);
    })
});

/**
 * UPDATE WEEKLY PAYMENT
 */
router.put('/weekly', (req, res) => {
  
  const updateWeeklyPaymentQuery = `UPDATE chore_payment_weekly 
                                    SET weekly = ${req.body.schedule.weekly},
                                    total_payment = ${req.body.totalPayment}
                                    WHERE id = ${req.body.id};`;
    console.log('updateWeeklyPaymentQuery is:', updateWeeklyPaymentQuery)
  pool.query(updateWeeklyPaymentQuery)
    .then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('Update weekly payment error is:', error);
      res.sendStatus(500);
    })
});

module.exports = router;
