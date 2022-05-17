const express = require('express')
const router = express.Router();
const fishSeed = require('../models/seed.js') //seed data
const Fish = require('../models/schema.js') //schema


//Middleware
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
    res.redirect('/aquarium')
  })
})


//--- INDEX ROUTE
router.get('/', (req, res) => {
  console.log(req.session);
  Fish.find({}, (err, allFish) => {
    res.render('index.ejs',
      {
        fishData: allFish,
        currentUser: req.session,
      }
    )
  })
})


//--- Create ROUTE
router.post('/', isAuthenticated, (req, res) => {
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
router.get('/new', isAuthenticated, (req, res) => {
  res.render('new.ejs',
  {
    currentUser: req.session,
  })
})

//--- UPDATE ROUTE
router.put('/:id', isAuthenticated, (req, res) => {
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
router.get('/:id/edit', isAuthenticated, (req, res) => {
  Fish.findById(req.params.id, (err, foundFish) => {
    res.render('edit.ejs',
      {
        fishData: foundFish,
        currentUser: req.session,
      }
    )
  })
})

//--- DESTROY (DELETE) ROUTE
router.delete('/:id', isAuthenticated, (req, res) => {
  Fish.deleteOne({_id: req.params.id}, (err, deletedFish) => {
    res.redirect('/aquarium')
  })
})

//--- SHOW ROUTE
router.get('/:id', isAuthenticated, (req, res) => {
  Fish.findById(req.params.id, (err, foundFish) => {
    res.render('show.ejs',
      {
        fishData: foundFish,
        currentUser: req.session,
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
