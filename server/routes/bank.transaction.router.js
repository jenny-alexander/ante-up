const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/add', (req, res) => {
    console.log(' in add bank transaction history router & req is:', req.body);
    const createBankTxnQuery = `INSERT INTO bank_transaction_history ("type", "date", "amount", "user_id", "notes")
                                VALUES($1,$2,$3,$4,$5)`;
    pool.query(createBankTxnQuery, [req.body.type, req.body.timestamp, req.body.amount, req.body.userId, req.body.notes])
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('add transaction table error:', error);
            res.sendStatus(500);
        })
})

/**
 * GET "old" allowances where deposits = FALSE
 */
router.get('/:id', (req, res) => {
    console.log('GET last bank transaction & user id passed is:', req.params.id);
    const getLastTransactionQuery = `SELECT * FROM bank_transaction_history where user_id = ${req.params.id}
                               ORDER BY id DESC LIMIT 1;`;
    console.log('getLastTransactionQuery is:', getLastTransactionQuery);
    pool.query(getLastTransactionQuery)
        .then((results) => {
            console.log('results from get latest transaction is:', results.rows[0]);
            res.send(results.rows[0])
        }).catch((error) => {
            console.log('GET latest transaction record from server error is:', error);
        })
});

module.exports = router;