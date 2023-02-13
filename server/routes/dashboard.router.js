const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
/**
 * GET route template
 */
// router.get('/payment/individual/1/1')
router.get('/payment/individual/:userID/:weekID', (req, res) => {    
    let query = `SELECT b.name, a.chore_id, a.total_payment
                FROM chore_payment_daily AS a
                INNER JOIN chore AS b
                ON b.id = a.chore_id
                WHERE a.user_id = ${req.params.userID} 
                AND a.week_id = ${req.params.weekID};`;               
    pool.query(query)
    .then((dailyResults) => {
        query = `SELECT b.name, a.chore_id, a.total_payment
                FROM chore_payment_weekly AS a
                INNER JOIN chore AS b
                ON b.id = a.chore_id
                WHERE a.user_id = ${req.params.userID} 
                AND a.week_id = ${req.params.weekID};`;            
        pool.query(query)
        .then((weeklyResults) => {
            query = `SELECT b.name, a.chore_id, a.total_payment
            FROM chore_payment_adhoc AS a
            INNER JOIN chore AS b
            ON b.id = a.chore_id
            WHERE a.user_id = ${req.params.userID} 
            AND a.week_id = ${req.params.weekID};`;
            pool.query(query)
             .then((adhocResults) => {
                const mergedResults = [...dailyResults.rows, ...weeklyResults.rows, ...adhocResults.rows];
                res.send(mergedResults);
              }).catch((error) => {
                console.log('SELECT individual adhoc chore payment error is:', error);
            })
        }).catch((error) => {
            console.log('SELECT individual weekly chore payment error is:', error);
        })
    }).catch((error) => {
      console.log('SELECT individual daily chore payment error is:', error);
    })
});

module.exports = router;
