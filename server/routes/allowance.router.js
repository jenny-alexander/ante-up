const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET latest allowance (where latest = TRUE)
 */
router.get('/latest/:id', (req, res) => {
  console.log('user id passed is:', req.params.id);
  const getLatestAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.id}
                             AND latest = TRUE;`;
  console.log('getAllowanceQuery is:', getLatestAllowanceQuery);
  pool.query(getLatestAllowanceQuery)
    .then((results) => {
      console.log('results from get latest allowance is:', results.rows[0]);
      res.send(results.rows[0])
    }).catch((error) => {
      console.log('GET allowance records from server error is:', error);
    })
});

/**
 * GET "old" allowances where deposits = FALSE
 */
router.get('/:id', (req, res) => {
  console.log('GET "OLD" allowances & user id passed is:', req.params.id);
  const getAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.id}
                             AND latest = FALSE;`;
  console.log('getAllowanceQuery is:', getAllowanceQuery);
  pool.query(getAllowanceQuery)
    .then((results) => {
      console.log('results from get allowance is:', results.rows);
      res.send(results.rows)
    }).catch((error) => {
      console.log('GET allowance records from server error is:', error);
    })
});

/**
 * PUT route template
 */
router.put('/update-deposit-flag', (req, res) => {
  console.log('WHOOP WHOOP ABOUT TO CHANGE DEPO FLAGS')
  const updateAllowanceFlagQuery = `UPDATE allowance set ${req.body.depositedFlagColumn} = TRUE
                           WHERE id = ${req.body.updatedLatestAllowance.id}
                             AND user_id = ${req.body.updatedLatestAllowance.user_id};`
  console.log('updateAllowanceFlagQuery is:', updateAllowanceFlagQuery);
  pool.query(updateAllowanceFlagQuery)
    .then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('Update Allowance Flag error is:', error);
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
