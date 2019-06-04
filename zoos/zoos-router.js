const knex = require('knex'); 
const router = require('express').Router(); 

// To import data (for model later)
// const Roles = require('./roles/roles-model'); 

// 1. npm install knex and driver 
// 2. configure knex, after importing up above, and get a connection to database

//3. Configuring knex 
const knexConfig = {
    client: 'sqlite3', 
    connection: {
      filename: './data/lambda.db3'
    }, 
    useNullAsDefault: true, 
  }

//4. Defining database 
const db = knex(knexConfig); 

// Endpoints here
// GET all (R IN CRUD)
router.get('/', (req, res) => {
    db('zoos').then(zoos => {
      res.status(200).json(zoos); 
    })
    .catch(error => {
      res.status(500).json(error); 
    })
  }); 
  
  // GET by id (R IN CRUD)
  router.get('/:id', (req, res) => {
      db('zoos').where({ id: req.params.id })
      .first()
      .then(zoo => {
          if(zoo) {
              res.status(200).json(zoo); 
          } else {
              res.status(404).json({message: "Zoo not found, better build it!"})
          }
      }) .catch(error => {
          res.status(500).json(error);
      });
  });

  module.exports = router; 