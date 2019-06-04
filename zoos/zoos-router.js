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

// POST (C in CRUD)
router.post('/', (req, res) => {
    db('zoos').insert(req.body, 'id').then(ids => {
        res.status(201).json(ids); 
    }).catch(error => {
        res.status(500).json(error); 
    })
}); 

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

  // PUT (U IN CRUD)
  router.put('/:id', (req, res) => {
      const changes = req.body; 
      db('zoos').where({ id: req.params.id }).update(changes).then(count => {
          if (count > 0) {
              res.status(200).json({message: `${count} zoos updated!`})
          } else {
              res.status(404).json({message: "Zoo not found!"})
          } 
      }) .catch(error => {
          res.status(500).json(error); 
      })
  });

  // DELETE (D in CRUD)
  router.delete('/:id', (req, res) => {
      db('zoos').where({id: req.params.id})
      .del()
      .then(count => {
          if(count > 0) {
              const unit = count> 1 ? 'zoos' : 'zoo';
              res.status(200).json({message: `${count} ${unit} deleted!`})
          } else {
              res.status(404).json({ message: 'Zoo not found!'})
        }
      })
      .catch(err => {
          res.status(500).json(err)
      })
  })

  module.exports = router; 