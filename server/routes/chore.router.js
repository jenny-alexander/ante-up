const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // GET route code here
  const getChoreQuery = `SELECT name, description, frequency, payment, user_chore.status from user_chore
                        INNER JOIN chore
                        ON user_chore.chore_id = chore.id
                        WHERE user_id = ${req.params.id};`;
  console.log('getChoreQuery is:', getChoreQuery);
  pool.query(getChoreQuery)
    .then((results) => {
      console.log('results from get chore query are:', results.rows);
      res.send(results.rows);
    }).catch((error) => {
      console.log('GET chore records from server error is:', error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
