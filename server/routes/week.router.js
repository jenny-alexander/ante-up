const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  pool.query('SELECT * from week WHERE CURRENT_DATE BETWEEN start_date and end_date')
    .then((results) => {      
      res.send(results.rows);
    }).catch((error) => {
      console.log('GET week records from server error is:', error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
