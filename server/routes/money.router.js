const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:username', (req, res) => {
  const getMoneyQuery = `SELECT * FROM money where username = ${req.params.username};`;
  pool.query(getMoneyQuery)
    .then((results) => {
      res.send(results.rows)
    }).catch((error) => {
      console.log('GET money records from server error is:', error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
