const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  console.log('id passed is:', req.params.id);
  const getMoneyQuery = `SELECT * FROM money where id = ${req.params.id};`;
  console.log('getMoneyQuery is:', getMoneyQuery);
  pool.query(getMoneyQuery)
    .then((results) => {
      console.log('results from get money is:', results);
      res.send(results.rows)
    }).catch((error) => {
      console.log('GET money records from server error is:', error);
    })
});

/**
 * PUT route template
 */
router.put('/deposit', (req, res) => {
  // PUT route code here
  console.log('req in deposit router is:', req.body);
  const updateMoneyQuery = `UPDATE money set ${req.body.toAccount} = ${req.body.toAccount} + ${req.body.amount},
                              ${req.body.depositFlag} = TRUE;`
  console.log('updateMoneyQuery is:', updateMoneyQuery);

  pool.query(updateMoneyQuery)
    .then((result) => {
    }).catch((error) => {
      console.log('Deposit money error is:', error);
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
