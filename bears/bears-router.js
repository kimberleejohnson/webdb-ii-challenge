const router = require('express').Router(); 

const Bears = require('./bears-model.js'); 

// Endpoints here
// POST (C in CRUD)
router.post('/', (req, res) => {
    Bears.add(req.body, 'id').then(ids => {
        res.status(201).json(ids); 
    }).catch(error => {
        res.status(500).json(error); 
    })
}); 

// GET all (R IN CRUD)
router.get('/', (req, res) => {
    Bears.find().then(bears => {
      res.status(200).json(bears); 
    })
    .catch(error => {
      res.status(500).json(error); 
    })
  }); 
  
  // GET by id (R IN CRUD)
  router.get('/:id', (req, res) => {
      Bears.findById(req.params.id)
      .then(bear => {
          if(bear) {
              res.status(200).json(bear); 
          } else {
              res.status(404).json({message: "Bear not found, better build it!"})
          }
      }) .catch(error => {
          res.status(500).json(error);
      });
  });

  // PUT (U IN CRUD)
  router.put('/:id', (req, res) => {
      const changes = req.body; 
      Bears.update(req.params.id, changes).then(count => {
          if (count > 0) {
              res.status(200).json({message: `${count} bears updated!`})
          } else {
              res.status(404).json({message: "Bear not found!"})
          } 
      }) .catch(error => {
          res.status(500).json(error); 
      })
  });

  // DELETE (D in CRUD)
  router.delete('/:id', (req, res) => {
      Bears.remove(req.params.id)
      .then(count => {
          if(count > 0) {
              const unit = count> 1 ? 'bears' : 'bear';
              res.status(200).json({message: `${count} ${unit} deleted!`})
          } else {
              res.status(404).json({ message: 'Bear not found!'})
        }
      })
      .catch(err => {
          res.status(500).json(err)
      })
  })

  module.exports = router; 