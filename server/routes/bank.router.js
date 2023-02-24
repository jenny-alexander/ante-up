const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 * 
 * (share + spend + save) as TOTAL
 */
router.get('/:id', (req, res) => {
    const getBankQuery = `SELECT *, (share + spend + save) as TOTAL FROM bank where user_id = ${req.params.id};`;
    pool.query(getBankQuery)
        .then((results) => {
            res.send(results.rows[0])
        }).catch((error) => {
            console.log('GET bank records from server error is:', error.message);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 * 
 * (share + spend + save) as TOTAL
 */
router.post('/new/:userId', (req, res) => {
    const addBankQuery = `INSERT INTO bank ("user_id")
                              VALUES($1);`;                                                                       
    pool.query(addBankQuery, [req.params.userId])
      .then((result) => {      
        res.status(200);     
      }).catch((error) => {
        console.log('Add new BANK record error:', error);
        res.sendStatus(500);
      })
});

/**
 * PUT route template
 */
router.put('/deposit', (req, res) => {
    let action = '';
    if (req.body.depositDetails.bankChangeType === 'deposit') {
        action = '+';
    } else if (req.body.depositDetails.bankChangeType === 'withdraw') {
        action = '-';
    }
    const updateBankQuery = `UPDATE bank set ${req.body.depositDetails.toAccount} = ${req.body.depositDetails.toAccount} ${action} ${req.body.depositDetails.amount}
        WHERE user_id = ${req.body.userID};`        
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
    let amount = null;
    if (req.body.amount !== '') {
        amount = req.body.amount;
    }
    const saveGoalQuery = `UPDATE bank set goal_amount = ${amount},
                                           goal_desc = '${req.body.description}'
                                        where user_id = ${req.body.userID};`;
    pool.query(saveGoalQuery)
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;