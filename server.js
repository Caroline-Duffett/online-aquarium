//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;


// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , () => {
  console.log('connected to mongo');
});


// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


//___________________
//Models
//___________________
const fishSeed = require('./models/seed.js'); //seed data
const Fish = require('./models/schema.js'); //schema


//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form




//___________________
// Routes
//___________________
//---Test Route
// //localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//--- NEW ROUTE
// app.get('/new', (req, res) => {
//   res.render('new.ejs')
// })

//--- UPDATE ROUTE
app.put('/:id', (req, res) => {
  Fish.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedFish) => {
    Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(',')}, {new: true}, (err, updatedDish) => {
      res.redirect('/')
    })
  })
})

//--- SEED ROUTE
// app.get('/seed', (req, res) => {
//   Fish.create(fishSeed, (err, data) => {
//     res.redirect('/')
//   })
// })

//--- INDEX ROUTE
app.get('/', (req, res) => {
  Fish.find({}, (err, allFish) => {
    res.render('index.ejs',
      {
        fishData: allFish,
      }
    )
  })
})

//--- Create ROUTE
// app.post('/', (req, res) => {
//   Fish.create(req.body, (err, createdFish) => {
//     res.send('/aquarium')
//   })
// })

//--- Edit ROUTE
app.get('/:id/edit', (req, res) => {
  Fish.findById(req.params.id, (err, foundFish) => {
    res.render('edit.ejs',
      {
        fishData: foundFish,
      }
    )
  })
})

//--- SHOW ROUTE
app.get('/:id', (req, res) => {
  Fish.findById(req.params.id, (err, foundFish) => {
    res.render('show.ejs',
      {
        fishData: foundFish,
      }
    )
  })
})

//--- DESTROY (DELETE) ROUTE
app.delete('/:id', (req, res) => {
  Fish.deleteOne({_id: req.params.id}, (err, deletedFish) => {
    res.redirect('/')
  })
})




//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
