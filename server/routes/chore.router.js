const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // GET route code here
  const getChoreQuery = `SELECT chore.id, name, description, frequency, payment from user_chore
                        INNER JOIN chore
                        ON user_chore.chore_id = chore.id
                        WHERE user_id = ${req.params.id};`;  
  pool.query(getChoreQuery)
    .then((results) => {      
      res.send(results.rows);
    }).catch((error) => {
      console.log('GET chore records from server error is:', error);
    })
});

/**
 * POST route template
 */
router.post('/add', (req, res) => {
  const createChoreQuery = `INSERT INTO chore ("name", "description", "frequency", "payment")
                            VALUES($1,$2,$3,$4)
                            RETURNING "id"`; 
  pool.query(createChoreQuery, [req.body.choreDetails.name, 
                                req.body.choreDetails.description, 
                                req.body.choreDetails.frequency, 
                                req.body.choreDetails.payment])
    .then((result) => {
      const newChoreId = result.rows[0].id;
      const addChoreToUserQuery = `INSERT INTO user_chore ("chore_id", "user_id") VALUES($1,$2);`;
      pool.query(addChoreToUserQuery, [newChoreId, req.body.userID])
        .then((result) => {
          res.sendStatus(201);
      }).catch((error) => {
        console.log('Add chore table error:', error);
        res.sendStatus(500);
      })      
    }).catch((error) => {
      console.log('Add chore table error:', error);
      res.sendStatus(500);
    })
});

module.exports = router;
