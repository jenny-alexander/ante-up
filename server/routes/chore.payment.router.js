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

router.get('/adhoc/:userID/:weekID', (req, res) => {
  const adhocPaymentQuery = `SELECT * FROM chore_payment_adhoc
                        WHERE user_id = ${req.params.userID}
                        AND week_id = ${req.params.weekID};`;      
  pool.query(adhocPaymentQuery)
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      console.log('SELECT adhoc chore payment error is:', error);
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

router.get('/adhoc/total/:userID/:weekID', (req, res) => {  
  const adhocTotalQuery = `SELECT SUM (total_payment) AS total_adhoc_chore FROM chore_payment_adhoc
                             WHERE user_id = ${req.params.userID}
                             AND week_id = ${req.params.weekID};`;                             
  pool.query(adhocTotalQuery)
    .then((results) => {      
      res.send(results?.rows[0]?.total_adhoc_chore);
    }).catch((error) => {
      console.log('SELECT adhoc total chore payment error is:', error);
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
  pool.query(updateWeeklyPaymentQuery)
    .then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('Update weekly payment error is:', error);
      res.sendStatus(500);
    })
});

/**
 * UPDATE ADHOC PAYMENT
 */
router.put('/adhoc', (req, res) => {
  
  const updateAdhocPaymentQuery = `UPDATE chore_payment_adhoc 
                                    SET adhoc = ${req.body.schedule.adhoc},
                                    total_payment = ${req.body.totalPayment}
                                    WHERE id = ${req.body.id};`;    
  pool.query(updateAdhocPaymentQuery)
    .then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('Update adhoc payment error is:', error);
      res.sendStatus(500);
    })
});

//ADD NEW CHORE PAYMENT
router.post('/add', (req, res) => {
  console.log('values in req.body are:', req.body);
  const addChorePaymentQuery = `INSERT INTO chore_payment_${req.body.frequency} ("chore_id", "user_id", "week_id", "user_chore_id")
                              VALUES($1,$2,$3,$4)`;  
  
  pool.query(addChorePaymentQuery, [req.body.choreId, req.body.userId, req.body.weekID, req.body.user_chore_id])
      .then((results) => {
          res.sendStatus(201);
      }).catch((error) => {
          console.log('add new chore payment error:', error);
          res.sendStatus(500);
      })
})

// //REMOVE CHORE PAYMENT
// router.put('/remove', (req, res) => {
//   const removeChorePaymentQuery = `DELETE FROM chore_payment_${req.body.frequency} 
//                                   WHERE chore_id = ${req.body.choreId}
//                                   AND week_id = ${req.body.weekID}
//                                   AND user_id = ${req.body.userId};`;    
//   pool.query(removeChorePaymentQuery)
//       .then((results) => {
//           res.sendStatus(201);
//       }).catch((error) => {
//           console.log('remove new chore payment error:', error);
//           res.sendStatus(500);
//       })
// })
//REMOVE CHORE PAYMENT
router.delete('/remove/:id/:frequency', (req, res) => {
  console.log('in delete chore payment and req.params are:', req.params);
  const removeChorePaymentQuery = `DELETE FROM chore_payment_${req.params.frequency} 
                                  WHERE user_chore_id = ${req.params.id};`;    
  pool.query(removeChorePaymentQuery)
      .then((results) => {
          res.sendStatus(200);
      }).catch((error) => {
          console.log('remove new chore payment error:', error);
          res.sendStatus(500);
      })
})

module.exports = router;