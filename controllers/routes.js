const express = require('express')
const router = express.Router()
const fishSeed = require('../models/seed.js') //seed data
const Fish = require('../models/schema.js') //schema



//___________________
// Routes
//___________________
//---Test Route
// //localhost:3000
// router.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//--- SEED ROUTE
router.get('/seed', (req, res) => {
  Fish.create(fishSeed, (err, data) => {
    res.redirect('/')
  })
})

//--- INDEX ROUTE
router.get('/', (req, res) => {
  Fish.find({}, (err, allFish) => {
    res.render('index.ejs',
      {
        fishData: allFish,
      }
    )
  })
})

//--- Create ROUTE
router.post('/', (req, res) => {
  if (req.body.img === '') {
    req.body.img = 'https://i.imgur.com/EXotp4G.png';
  }
  Fish.create(req.body, (err, createdFish) => {
    Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, createdFish) => {
      res.redirect('/')
    })
  })
})

//--- NEW ROUTE
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

//--- UPDATE ROUTE
router.put('/:id', (req, res) => {
  if (req.body.img === '') {
    req.body.img = 'https://i.imgur.com/EXotp4G.png';
  }
  Fish.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedFish) => {
    Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(',')}, {new: true}, (err, updatedDish) => {
      res.redirect('/')
    })
  })
})

//--- SHOW ROUTE
router.get('/:id', (req, res) => {
  Fish.findById(req.params.id, (err, foundFish) => {
    res.render('show.ejs',
      {
        fishData: foundFish,
      }
    )
  })
})

//--- Edit ROUTE
router.get('/:id/edit', (req, res) => {
  Fish.findById(req.params.id, (err, foundFish) => {
    res.render('edit.ejs',
      {
        fishData: foundFish,
      }
    )
  })
})

//--- DESTROY (DELETE) ROUTE
router.delete('/:id', (req, res) => {
  Fish.deleteOne({_id: req.params.id}, (err, deletedFish) => {
    res.redirect('/')
  })
})

module.exports = router
