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

//--- SEED ROUTE
app.get('/seed', (req, res) => {
  Fish.create(fishSeed, (err, data) => {
    res.redirect('/')
  })
})

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
app.post('/', (req, res) => {
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
app.get('/new', (req, res) => {
  res.render('new.ejs')
})

//--- UPDATE ROUTE
app.put('/:id', (req, res) => {
  Fish.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedFish) => {
    Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(',')}, {new: true}, (err, updatedDish) => {
      res.redirect('/')
    })
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






//---------- Graveyard ----------//
//--- Original edit form:
// <form class="fish-form" action="/<%=fishData._id%>?_method=PUT" method="POST">
//   Name: <input type="text" name="name" value="<%=fishData.name%>" required/><br/>
//   Scientific Name: <input type="scientificName" name="scientificName" value="<%=fishData.scientificName%>"/><br/>
//   Description: <input type="text" name="description" value="<%=fishData.description%>" required/><br/>
//   Animal Type: <input type="text" name="animalType" value="<%=fishData.animalType%>" required/><br/>
//   Range: <input type="text" name="range" value="<%=fishData.range%>" required/><br/>
//   Image URL: <input type="url" name="img" value="<%=fishData.img%>"/><br/>
//   Number: <input type="number" name="number" value="<%=fishData.number%>" required/><br/>
//   Diet: <input type="text" name="diet" value="<%=fishData.diet%>"/><br/>
//   Size: <input type="text" name="size" value="<%=fishData.size%>"/><br/>
//
//   <input class='form-button' type="submit" value="Submit Changes"/>
// </form>

//--- Original finsh-wrapper before index flexbox
// .fish-wrapper {
//   margin: 2em auto;
//   width: 50%;
//   display: flex;
//   flex-direction: column;
//   flex-wrap: nowrap;
//   background-color: lightblue;
//   border-radius: 2em;
//   align-items: center;
// }

//original background
// background-color: #ebf5fb;
// background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%235dade2' fill-opacity='0.21' fill-rule='evenodd'/%3E%3C/svg%3E");
//color: #85C1E9
