const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get all chores
router.get('/', (req, res) => {
  const getAllChoresQuery = `SELECT * FROM chore;`;
  pool.query(getAllChoresQuery)
    .then((results) => {      
      res.send(results.rows);
    }).catch((error) => {
      console.log('GET ALL chore records from server error is:', error);
    })
});

// Get chores by userid
router.get('/:userID/:weekID', (req, res) => {
  const getChoreQuery = `SELECT chore.id, name, description, frequency, payment from user_chore
                        INNER JOIN chore
                        ON user_chore.chore_id = chore.id
                        WHERE user_id = ${req.params.userID}
                        AND week_id = ${req.params.weekID};`;                          
  pool.query(getChoreQuery)
    .then((results) => {      
      res.send(results.rows);
    }).catch((error) => {
      console.log('GET chore records from server error is:', error);
    })
});

//Assign chore to user
router.post('/assign', (req, res) => {
  const assignChoreToUserQuery = `INSERT INTO user_chore ("chore_id", "user_id", "week_id")
                              VALUES($1,$2,$3)`;
  pool.query(assignChoreToUserQuery, [req.body.choreId, req.body.userId, req.body.weekID])
      .then((results) => {
          //res.sendStatus(201);
          const getChoreQuery = `SELECT chore.id, name, description, frequency, payment from user_chore
                                INNER JOIN chore
                                ON user_chore.chore_id = chore.id
                                WHERE user_id = ${req.body.userId}
                                AND week_id = ${req.body.weekID};`;  
          pool.query(getChoreQuery)
            .then((results) => {      
              res.send(results.rows);
            }).catch((error) => {
            console.log('GET chore records from server error is:', error);
          })
      })
      .catch((error) => {
          console.log('assign chore to user error:', error);
          res.sendStatus(500);
      })
})

//Remove chore from user
router.put('/remove', (req, res) => {
  const removeChoreFromUserQuery = `DELETE FROM user_chore WHERE chore_id = ${req.body.choreId}
                                    AND user_id = ${req.body.userId};`;                              
  pool.query(removeChoreFromUserQuery)
      .then((results) => {
          const getChoreQuery = `SELECT chore.id, name, description, frequency, payment from user_chore
                                INNER JOIN chore
                                ON user_chore.chore_id = chore.id
                                WHERE user_id = ${req.body.userId}
                                AND week_id = ${req.body.weekID};`;  
            pool.query(getChoreQuery)
              .then((results) => {      
                res.send(results.rows);
              }).catch((error) => {
                console.log('GET chore records from server error is:', error);
              })
      })
      .catch((error) => {
          console.log('assign chore to user error:', error);
          res.sendStatus(500);
      })
})

// Add chore to list of all chores
router.post('/add', (req, res) => {
  const createChoreQuery = `INSERT INTO chore ("name", "frequency", "payment")
                            VALUES($1,$2,$3)
                            RETURNING "id"`; 
                            console.log('createChoreQuery is:', createChoreQuery);
  pool.query(createChoreQuery, [req.body.choreName, 
                                req.body.choreFrequency, 
                                req.body.chorePayment])
    .then((result) => {
      res.status(200).send((result.rows[0].id).toString());     
    }).catch((error) => {
      console.log('Add chore table error:', error);
      res.sendStatus(500);
    })
});

module.exports = router;
