const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get this week's info
router.get('/', (req, res) => {
  pool.query('SELECT * from week WHERE CURRENT_DATE BETWEEN start_date and end_date')
    .then((results) => {
      res.send(results.rows[0]);
    }).catch((error) => {
      console.log('GET week records from server error is:', error);
    })
});

module.exports = router;
