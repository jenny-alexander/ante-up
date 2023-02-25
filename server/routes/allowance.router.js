const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET latest allowance (where latest = TRUE)
 */
router.get('/latest/:userId/:weekId', (req, res) => {
  const getLatestAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.userId}
                                       AND week_id = ${req.params.weekId};`;                             
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
  const getNextAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.id}
                                 AND allowance_date = '${req.body.nextAllowanceDate}';`;                                 
  pool.query(getNextAllowanceQuery)
    .then((results) => {
      res.send(results.rows[0])
    }).catch((error) => {
      console.log('GET NEXT allowance record from server error is:', error);
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
router.post('/add/', (req, res) => {  
    const addAllowanceQuery = `INSERT INTO allowance ("user_id", "week_id", "allowance_date",
                              "spend", "save", "share")
                              VALUES($1,$2,$3,$4,$5,$6);`;                                                  
    pool.query(addAllowanceQuery, [req.body.userId, 
                                  req.body.weekId, 
                                  req.body.allowanceDate,
                                  Math.ceil(req.body.spend),
                                  Math.ceil(req.body.save),
                                  Math.ceil(req.body.share),
                                  // req.body.spend.toFixed(2),
                                  // req.body.save.toFixed(2),
                                  // req.body.share.toFixed(2),
                                ])
      .then((result) => {      
        res.status(200);     
      }).catch((error) => {
        console.log('Add new CHORE record error:', error);
        res.sendStatus(500);
      })
});

module.exports = router;
