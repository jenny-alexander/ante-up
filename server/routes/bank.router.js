const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 * 
 * (share + spend + save) as TOTAL
 */

router.get('/:id', (req, res) => {
    console.log('id passed is:', req.params.id);
    // const getBankQuery = `SELECT * FROM bank where user_id = ${req.params.id};`;
    const getBankQuery = `SELECT *, (share + spend + save) as TOTAL FROM bank where user_id = ${req.params.id};`;
    console.log('getBankQuery is:', getBankQuery);
    pool.query(getBankQuery)
        .then((results) => {
            console.log('results from get bank is:', results.rows[0]);
            res.send(results.rows[0])
        }).catch((error) => {
            console.log('GET bank records from server error is:', error.message);
            res.sendStatus(500);
        })
});

// // GET total amount for user in bank
// router.get('/total/:id', (req, res) => {
//     const getTotalBankQuery = `SELECT SUM (save, spend, share) AS TOTAL FROM BANK where user_id = ${req.params.id};`;
//     console.log('getTotalBankQuery is:', getTotalBankQuery);
//     pool.query(getTotalBankQuery)
//         .then((results) => {
//             console.log('results from get total bank query are:', results.rows[0]);
//             res.send(results.rows[0]);
//         }).catch((error) => {
//             console.log('error from total bank query is:', error);
//             res.sendStatus(500);
//         })
// })

/**
 * PUT route template
 */
router.put('/deposit', (req, res) => {
    const updateBankQuery = `UPDATE bank set ${req.body.depositDetails.toAccount} = ${req.body.depositDetails.toAccount} + ${req.body.depositDetails.amount}
                             WHERE user_id = ${req.body.userID};`
    console.log('updateBankQuery is:', updateBankQuery);
    pool.query(updateBankQuery)
        .then((result) => {
            const getBankQuery = `SELECT * FROM bank where user_id = ${req.body.userID};`;
            pool.query(getBankQuery)
                .then((results) => {
                    res.send(results.rows[0])
                }).catch((error) => {
                    console.log('GET bank records from server error is:', error.message);
                })
        }).catch((error) => {
            console.log('Deposit bank error is:', error);
            res.sendStatus(500);
        })
});

module.exports = router;