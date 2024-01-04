const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get latest allowance for user
router.get('/latest/:userId/:weekId', (req, res) => {
  const getLatestAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.userId}
                                       AND week_id = ${req.params.weekId};`;
  pool.query(getLatestAllowanceQuery)
    .then((results) => {
      if (results.rows[0] === undefined) {
        res.sendStatus(204);
      } else {
        res.send(results.rows[0]);
      }
    }).catch((error) => {
      console.log('GET allowance records from server error is:', error);
    })
});

//Get next allowance for user
router.get('/next/:id', (req, res) => {
  const getNextAllowanceQuery = `SELECT * FROM allowance where user_id = ${req.params.id}
                                 AND allowance_date = '${req.body.nextAllowanceDate}';`;
  pool.query(getNextAllowanceQuery)
    .then((results) => {
      res.send(results.rows[0]);
    }).catch((error) => {
      console.log('GET NEXT allowance record from server error is:', error);
    })
});

//Update deposit flag for either: Save deposit, Share deposit or Spend deposit
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

//Add new allowance record when new user is registered
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
  ])
    .then((result) => {
      res.status(200);
    }).catch((error) => {
      console.log('Add new CHORE record error:', error);
      res.sendStatus(500);
    })
});

module.exports = router;
