const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET latest allowance (where latest = TRUE)
 */
router.get('/latest/:id', (req, res) => {
  const getLatestAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.id}
                             AND latest = TRUE;`;
  pool.query(getLatestAllowanceQuery)
    .then((results) => {
      res.send(results.rows[0])
    }).catch((error) => {
      console.log('GET allowance records from server error is:', error);
    })
});

/**
 * GET next allowance info
 */
router.get('/next/:id', (req, res) => {
  //Need to figure out which date to use.
  const todayDate = new Date();
  const dateCopy = new Date(todayDate.getTime());
  const nextAllowanceDate = new Date(dateCopy.setDate(dateCopy.getDate() + ((7 - dateCopy.getDay() + 4) % 7 || 7)));
  const dateForQuery = nextAllowanceDate.toLocaleDateString();

  const getNextAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.id}
                                 AND allowance_date = '${dateForQuery}';`;
  pool.query(getNextAllowanceQuery)
    .then((results) => {
      res.send(results.rows[0])
    }).catch((error) => {
      console.log('GET NEXT allowance record from server error is:', error);
    })
});

/**
 * GET "old" allowances where deposits = FALSE
 */
router.get('/:id', (req, res) => {
  const getAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.id}
                             AND latest = FALSE;`;
  pool.query(getAllowanceQuery)
    .then((results) => {
      res.send(results.rows)
    }).catch((error) => {
      console.log('GET allowance records from server error is:', error);
    })
});

/**
 * PUT route template
 */
router.put('/update-deposit-flag', (req, res) => {
  const updateAllowanceFlagQuery = `UPDATE allowance set ${req.body.depositedFlagColumn} = TRUE
                           WHERE id = ${req.body.updatedLatestAllowance.id}
                             AND user_id = ${req.body.updatedLatestAllowance.user_id};`
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
