const express = require('express')
const router = express.Router();
const fishSeed = require('../models/seed.js') //seed data
const Fish = require('../models/schema.js') //schema


const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

//___________________
// Routes (CRUD)
//___________________
//---Test Route
// //localhost:3000
// router.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//--- SEED ROUTE
router.get('/seed', (req, res) => {
  Fish.create(fishSeed, (err, data) => {
    res.redirect('/aquarium',
    {
      currentUser: req.session.currentUser,
    })
  })
})

//--- INDEX ROUTE
router.get('/', (req, res) => {
  Fish.find({}, (err, allFish) => {
    res.render('index.ejs',
      {
        fishData: allFish,
        currentUser: req.session.currentUser,
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
      res.redirect('/aquarium')
    })
  })
})


//--- NEW ROUTE
router.get('/new', (req, res) => {
  res.render('new.ejs',
  {
    currentUser: req.session.currentUser,
  })
})

//--- UPDATE ROUTE
router.put('/:id', (req, res) => {
  if (req.body.img === '') {
    req.body.img = 'https://i.imgur.com/EXotp4G.png';
  }
  Fish.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedFish) => {
    Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(',')}, {new: true}, (err, updatedDish) => {
      res.redirect('/aquarium')
    })
  })
})



//--- Edit ROUTE
router.get('/:id/edit', (req, res) => {
  Fish.findById(req.params.id, (err, foundFish) => {
    res.render('edit.ejs',
      {
        fishData: foundFish,
        currentUser: req.session.currentUser,
      }
    )
  })
})

//--- DESTROY (DELETE) ROUTE
router.delete('/:id', (req, res) => {
  Fish.deleteOne({_id: req.params.id}, (err, deletedFish) => {
    res.redirect('/aquarium')
  })
})

//--- SHOW ROUTE
router.get('/:id', (req, res) => {
  Fish.findById(req.params.id, (err, foundFish) => {
    res.render('show.ejs',
      {
        fishData: foundFish,
        currentUser: req.session.currentUser,
      }
    )
  })
})

module.exports = router





//---- post graveyard
//Try 1:
// router.post('/', (req, res) => {
//   if (req.body.img === '') {
//     req.body.img = 'https://i.imgur.com/EXotp4G.png';
//   }
//
//   Fish.create(req.body, (err, createdFish) => {
//     //res.send(createdFish)
//     const update = () => {
//       Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, updatedFish) => {
//         //res.redirect('/')
//         res.send(updatedFish)
//       })
//     }
//     update()
//   })
// })


//Try 2:
// router.post('/', (req, res) => {
//   if (req.body.img === '') {
//     req.body.img = 'https://i.imgur.com/EXotp4G.png';
//   }
//
//   Fish.create(req.body, (err, createdFish) => {
//     //res.send(createdFish)
//     Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, updatedFish) => {
//       //res.redirect('/')
//       res.send(updatedFish)
//     })
//   })
// })


//Try 3:
// router.post('/', (req, res) => {
//   if (req.body.img === '') {
//     req.body.img = 'https://i.imgur.com/EXotp4G.png';
//   }
//
//   Fish.create(req.body, (err, createdFish) => {
//     //res.send(createdFish)
//   })
//
//   Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, updatedFish) => {
//     //res.redirect('/')
//     res.send(updatedFish)
//   })
// })


//Try 4:
// router.post('/', (req, res) => {
//   if (req.body.img === '') {
//     req.body.img = 'https://i.imgur.com/EXotp4G.png';
//   }
//   Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, updatedFish) => {
//     Fish.create(req.body, (err, createdFish) => {
//       res.send(createdFish)
//     })
//   })
// })


//Try 5:
// router.post('/', (req, res) => {
//   if (req.body.img === '') {
//     req.body.img = 'https://i.imgur.com/EXotp4G.png';
//   }
//   Fish.create(req.body, (err, createdFish) => {
//     //res.send(createdFish)
//     Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, updatedFish) => {
//       res.send(updatedFish)
//     })
//   })
// })


//Try 6:
// router.post('/', (req, res) => {
//   if (req.body.img === '') {
//     req.body.img = 'https://i.imgur.com/EXotp4G.png';
//   }
//   Fish.create(req.body, (err, createdFish) => {
//     Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, createdFish) => {
//       res.redirect('/')
//     })
//   })
// })
