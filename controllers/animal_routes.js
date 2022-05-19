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
  if (req.body.animalImg === '' && req.body.species === 'Atlantic Bottlenose Dolphin') {
    req.body.animalImg = 'https://i.imgur.com/U9LiyPK.png';
  } else if (req.body.animalImg === '' && req.body.species === 'Giant Pacific Octopus') {
    req.body.animalImg = 'https://i.imgur.com/tdGKCXr.png';
  } else if (req.body.animalImg === '' && req.body.species === 'Scalloped Hammerhead Shark') {
    req.body.animalImg = 'https://i.imgur.com/KczDQKa.png';
  } else if (req.body.animalImg === '' && req.body.species === 'Green Turtle') {
    req.body.animalImg = 'https://i.imgur.com/twaDDuo.png';
  } else if (req.body.animalImg === '' && req.body.species == "Lion's Mane Jellyfish") {
    req.body.animalImg = 'https://i.imgur.com/zSvMh4a.png';
  } else if (req.body.animalImg === '' && req.body.species === "Lined Seahorse") {
    req.body.animalImg = 'https://i.imgur.com/fFAFr2D.png';
  } else if (req.body.animalImg === '' && req.body.species === "Percula Clownfish") {
    req.body.animalImg = 'https://i.imgur.com/XrqlL5D.png';
  } else if (req.body.animalImg === '' && req.body.species === "Porcupinefish") {
    req.body.animalImg = 'https://i.imgur.com/fn5A57x.png';
  } else if (req.body.animalImg === '' && req.body.species === "Reticulated Whiptail Ray") {
    req.body.animalImg = 'https://i.imgur.com/sw3cZUx.png';
  } else if (req.body.animalImg === '' && req.body.species === "California Moray") {
    req.body.animalImg = 'https://i.imgur.com/ucwqYd2.png';
  } else if (req.body.animalImg === '') {
    req.body.animalImg = 'https://i.imgur.com/zKVuuKY.png';
  }
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
  if (req.body.animalImg === '' && req.body.species === 'Atlantic Bottlenose Dolphin') {
    req.body.animalImg = 'https://i.imgur.com/U9LiyPK.png';
  } else if (req.body.animalImg === '' && req.body.species === 'Giant Pacific Octopus') {
    req.body.animalImg = 'https://i.imgur.com/tdGKCXr.png';
  } else if (req.body.animalImg === '' && req.body.species === 'Scalloped Hammerhead Shark') {
    req.body.animalImg = 'https://i.imgur.com/KczDQKa.png';
  } else if (req.body.animalImg === '' && req.body.species === 'Green Turtle') {
    req.body.animalImg = 'https://i.imgur.com/twaDDuo.png';
  } else if (req.body.animalImg === '' && req.body.species == "Lion's Mane Jellyfish") {
    req.body.animalImg = 'https://i.imgur.com/zSvMh4a.png';
  } else if (req.body.animalImg === '' && req.body.species === "Lined Seahorse") {
    req.body.animalImg = 'https://i.imgur.com/fFAFr2D.png';
  } else if (req.body.animalImg === '' && req.body.species === "Percula Clownfish") {
    req.body.animalImg = 'https://i.imgur.com/XrqlL5D.png';
  } else if (req.body.animalImg === '' && req.body.species === "Porcupinefish") {
    req.body.animalImg = 'https://i.imgur.com/fn5A57x.png';
  } else if (req.body.animalImg === '' && req.body.species === "Reticulated Whiptail Ray") {
    req.body.animalImg = 'https://i.imgur.com/sw3cZUx.png';
  } else if (req.body.animalImg === '' && req.body.species === "California Moray") {
    req.body.animalImg = 'https://i.imgur.com/ucwqYd2.png';
  } else if (req.body.animalImg === '') {
    req.body.animalImg = 'https://i.imgur.com/zKVuuKY.png';
  }
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
