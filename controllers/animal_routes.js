const express = require('express')
const animals = express.Router();
const animalSeed = require('../models/animal_seed.js') //seed data
const Animal = require('../models/animal_schema.js') //schema


//Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/')
  }
}


//___________________
// For Fish (info)
//___________________
const fishSeed = require('../models/aquarium_seed.js') //seed data
const Fish = require('../models/aquarium_schema.js') //schema


//___________________
// Routes (CRUD)
//___________________
//---Test Route
// //localhost:3000
// animals.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//--- SEED ROUTE
animals.get('/seed', isAuthenticated, (req, res) => {
  Animal.create(animalSeed, (err, data) => {
    res.redirect('/animal')
  })
})


//--- INDEX ROUTE
animals.get('/', isAuthenticated, (req, res) => {
  console.log(req.session);
  Animal.find({}, (err, allAnimals) => {
    res.render('animal/index.ejs',
      {
        animalData: allAnimals,
        currentUser: req.session,
      }
    )
  })
})


//--- Create ROUTE
animals.post('/', isAuthenticated, (req, res) => {
  Animal.create(req.body, (err, createdAnimal) => {
    res.redirect('/animal')
  })
})


//--- NEW ROUTE
animals.get('/new', isAuthenticated, (req, res) => {
  Fish.find({}, (err, allSpecies) => { //added for 2 models
    res.render('animal/new.ejs',
    {
      currentUser: req.session,
      species: allSpecies //added for 2 models
    })
  }) //added for 2 models
})

//--- UPDATE ROUTE
animals.put('/:id', isAuthenticated, (req, res) => {
  Animal.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedAnimal) => {
    res.redirect('/animal')
  })
})



//--- Edit ROUTE
animals.get('/:id/edit', isAuthenticated, (req, res) => {
  Animal.findById(req.params.id, (err, foundAnimal) => {
    Fish.find({}, (err, allSpecies) => { //added for 2 models
      res.render('animal/edit.ejs',
        {
          animalData: foundAnimal,
          currentUser: req.session,
          species: allSpecies //added for 2 models
        }
      )
    }) //added for 2 models
  })
})





//--- DESTROY (DELETE) ROUTE
animals.delete('/:id', isAuthenticated, (req, res) => {
  Animal.deleteOne({_id: req.params.id}, (err, deletedAnimal) => {
    res.redirect('/animal')
  })
})

//--- SHOW ROUTE
animals.get('/:id', isAuthenticated, (req, res) => {
  Animal.findById(req.params.id, (err, foundAnimal) => {
    res.render('animal/show.ejs',
      {
        animalData: foundAnimal,
        currentUser: req.session,
      }
    )
  })
})

module.exports = animals
