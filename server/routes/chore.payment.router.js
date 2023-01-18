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
    })
});

/**
 * UPDATE DAILY PAYMENT
 */
router.put('/daily', (req, res) => {
  const updateDailyPaymentQuery = `UPDATE chore_payment_weekly 
                                    SET monday = ${req.body.monday},
                                    tuesday = ${req.body.tuesday},
                                    wednesday = ${req.body.wednesday},
                                    thursday = ${req.body.thursday},
                                    friday = ${req.body.friday},
                                    saturday = ${req.body.saturday},
                                    sunday = ${req.body.sunday},
                                    total_payment = ${req.body.totalPayment}
                                    WHERE id = ${req.body.chorePayment.id}:`;      
                                    console.log('updateDailyPaymentQuery is:', updateDailyPaymentQuery)                   
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
                                    SET weekly = ${req.body.weekly},
                                    total_payment = ${req.body.totalPayment}
                                    WHERE id = ${req.body.chorePayment.id}:`;
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
