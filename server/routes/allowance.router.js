const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  console.log('id passed is:', req.params.id);
  const getAllowanceQuery = `SELECT * FROM allowance where id = ${req.params.id};`;
  console.log('getAllowanceQuery is:', getAllowanceQuery);
  pool.query(getAllowanceQuery)
    .then((results) => {
      console.log('results from get allowance is:', results.rows[0]);
      res.send(results.rows[0])
    }).catch((error) => {
      console.log('GET allowance records from server error is:', error);
    })
});

/**
 * PUT route template
 */
router.put('/deposit', (req, res) => {
  // PUT route code here
  console.log('req in deposit router is:', req.body);
  const updateAllowanceQuery = `UPDATE allowance set ${req.body.toAccount} = ${req.body.toAccount} + ${req.body.amount},
                              ${req.body.depositFlag} = TRUE;`
  console.log('updateAllowanceQuery is:', updateAllowanceQuery);

  pool.query(updateAllowanceQuery)
    .then((result) => {
    }).catch((error) => {
      console.log('Deposit allowance error is:', error);
      res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
