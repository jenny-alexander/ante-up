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

/**
 * PUT route template
 */
router.put('/deposit', (req, res) => {
    // const action = req.body.bankChangeType; //will be + or -
    console.log('CUCKOO req.body is:', req.body);
    let action = '';
    if (req.body.depositDetails.bankChangeType === 'deposit') {
        action = '+';
    } else if (req.body.depositDetails.bankChangeType === 'withdraw') {
        action = '-';
    }
    const updateBankQuery = `UPDATE bank set ${req.body.depositDetails.toAccount} = ${req.body.depositDetails.toAccount} ${action} ${req.body.depositDetails.amount}
        WHERE user_id = ${req.body.userID};`
    // const updateBankQuery = `UPDATE bank set ${req.body.depositDetails.toAccount} = ${req.body.depositDetails.toAccount} + ${req.body.depositDetails.amount}
    //                          WHERE user_id = ${req.body.userID};`
    console.log('updateBankQuery is:', updateBankQuery);
    pool.query(updateBankQuery)
        .then((result) => {
            const getBankQuery = `SELECT *, (spend + save + share) as TOTAL FROM bank where user_id = ${req.body.userID};`;
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

/**
 * PUT bank goal
 */
router.put('/save-goal', (req, res) => {
    console.log('OINK req.body is:', req.body);
    const saveGoalQuery = `UPDATE bank set goal_amount = ${req.body.goalAmount}
                                           goal_desc = ${req.body.goalDescription};`;
    console.log('saveGoalQuery is:', saveGoalQuery);
    pool.query(saveGoalQuery)
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;