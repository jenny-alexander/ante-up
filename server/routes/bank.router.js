const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('id passed is:', req.params.id);
    const getBankQuery = `SELECT * FROM bank where user_id = ${req.params.id};`;
    console.log('getBankQuery is:', getBankQuery);
    pool.query(getBankQuery)
        .then((results) => {
            console.log('results from get bank is:', results.rows[0]);
            res.send(results.rows[0])
        }).catch((error) => {
            console.log('GET bank records from server error is:', error);
        })
});

module.exports = router;