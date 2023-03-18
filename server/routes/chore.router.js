const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get all chores
router.get('/:userID', (req, res) => {
  const getAllChoresQuery = `SELECT * FROM chore where user_id = ${req.params.userID};`;
  pool.query(getAllChoresQuery)
    .then((results) => {      
      res.send(results.rows);
    }).catch((error) => {
      console.log('GET ALL chore records from server error is:', error);
    })
});

// Get chores by userid
router.get('/:userID/:weekID', (req, res) => {
  const getChoreQuery = `SELECT chore.id, user_chore.id as user_chore_id, name, description, frequency, payment from user_chore
                        INNER JOIN chore
                        ON user_chore.chore_id = chore.id
                        WHERE user_chore.user_id = ${req.params.userID}
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
                              VALUES($1,$2,$3)
                              RETURNING "id"`;
                              console.log('assignChoreToUserQuery is:', assignChoreToUserQuery);
  pool.query(assignChoreToUserQuery, [req.body.choreId, req.body.userId, req.body.weekID])
      .then((result) => {                    
          const getChoreQuery = `SELECT chore.id, user_chore.id as user_chore_id, name, description, frequency, payment from user_chore
          INNER JOIN chore
          ON user_chore.chore_id = chore.id
          WHERE user_chore.id = ${result.rows[0]?.id};`;
          console.log('getChoreQuery is', getChoreQuery);
          pool.query(getChoreQuery)
            .then((result) => {      
              res.send(result.rows);
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
router.delete('/remove/:id', (req, res) => {  
  const removeChoreFromUserQuery = `DELETE FROM user_chore WHERE id = ${req.params.id};`;                              
  pool.query(removeChoreFromUserQuery)
      .then((results) => {
        res.send(200);
      })
      .catch((error) => {
          console.log('assign chore to user error:', error);
          res.sendStatus(500);
      })
})

//Delete chore from chore table (for specific user)
router.delete('/delete/:id', (req, res) => {  
  const deleteChoreQuery = `DELETE FROM chore WHERE id = ${req.params.id};`;
  console.log('deleteChoreQuery is:', deleteChoreQuery);
  pool.query(deleteChoreQuery)
      .then((results) => {
        res.send(200);
      })
      .catch((error) => {
          console.log('delete chore error:', error);
          res.sendStatus(500);
      })
})

// Add chore to list of all chores
router.post('/add', (req, res) => {
  const createChoreQuery = `INSERT INTO chore ("name", "frequency", "payment")
                            VALUES($1,$2,$3)
                            RETURNING "id"`;                             
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
