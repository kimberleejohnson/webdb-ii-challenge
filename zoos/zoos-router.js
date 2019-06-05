const router = require('express').Router(); 

const Zoos = require('./zoos-model'); 

// Endpoints here

// POST (C in CRUD)
router.post('/', (req, res) => {
    Zoos.add(req.body, 'id').then(ids => {
        res.status(201).json(ids); 
    }).catch(error => {
        res.status(500).json(error); 
    })
}); 

// GET all (R IN CRUD)
router.get('/', (req, res) => {
    Zoos.find().then(zoos => {
      res.status(200).json(zoos); 
    })
    .catch(error => {
      res.status(500).json(error); 
    })
  }); 
  
  // GET by id (R IN CRUD)
  router.get('/:id', (req, res) => {
      Zoos.findById(req.params.id)
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
      Zoos.update(req.params.id, req.body).then(count => {
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
      Zoos.remove(req.params.id)
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