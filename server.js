//___________________
//Dependencies
//___________________
const express = require('express')
const methodOverride  = require('method-override')
const mongoose = require ('mongoose')
const app = express ()
const db = mongoose.connection
require('dotenv').config()

const session = require('express-session')

const aquariumController = require('./controllers/aquarium_routes.js')
const userController = require('./controllers/users_controller.js') //for Auth new account
const sessionsController = require('./controllers/sessions_controller.js')
const loginController = require('./controllers/login_controller.js')
const mapController = require('./controllers/maps.js')
const animalController = require('./controllers/animal_routes.js')
const homeController = require('./controllers/home_controller.js')


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , () => {
  console.log('connected to mongo')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))


//___________________
//For jQuery to work
//___________________
let jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
let $ = require("jquery")(window);


//___________________
//Middleware
//___________________
//use public folder for static assets
app.use(express.static('public'))

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'))// allow POST, PUT and DELETE from a form

//For Auth
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)


//___________________
//Controllers
//___________________
app.use('/aquarium', aquariumController ) //Aquarium Crud Routes
app.use('/users', userController) //For create account
app.use('/sessions', sessionsController) //for sessions
app.use('/', loginController) //For login
app.use('/map', mapController) //For map
app.use('/animal', animalController) //Animal Crud Routes
app.use('/home', homeController) //For home


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));





//---------- Graveyard ----------//
//kinda working post route:
// app.post('/', (req, res) => {
//   if (req.body.img === '') {
//     req.body.img = 'https://i.imgur.com/EXotp4G.png';
//   }
//   Fish.create(req.body, (err, createdFish) => {
//     Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, createdFish) => {
//       res.redirect('/')
//     })
//   })
// })


//original json:
// {
//   "name": "application",
//   "version": "1.0.0",
//   "engines": {
//     "node": "16.14.2"
//   },
//   "description": "",
//   "main": "server.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node server.js"
//   },
//   "repository": {
//     "type": "git",
//     "url": "git+https://github.com/StudentCD/application.git"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "bugs": {
//     "url": "https://github.com/StudentCD/application/issues"
//   },
//   "homepage": "https://github.com/StudentCD/application#readme",
//   "dependencies": {
//     "dotenv": "^16.0.1",
//     "ejs": "^3.1.8",
//     "express": "^4.18.1",
//     "method-override": "^3.0.0",
//     "mongoose": "^6.3.3"
//   }
// }


//Original Routes:
// //___________________
// // Routes
// //___________________
// //---Test Route
// // //localhost:3000
// // app.get('/' , (req, res) => {
// //   res.send('Hello World!');
// // });
//
// //--- SEED ROUTE
// app.get('/seed', (req, res) => {
//   Fish.create(fishSeed, (err, data) => {
//     res.redirect('/')
//   })
// })
//
// //--- INDEX ROUTE
// app.get('/', (req, res) => {
//   Fish.find({}, (err, allFish) => {
//     res.render('index.ejs',
//       {
//         fishData: allFish,
//       }
//     )
//   })
// })
//
// //--- Create ROUTE
// app.post('/', (req, res) => {
//   if (req.body.img === '') {
//     req.body.img = 'https://i.imgur.com/EXotp4G.png';
//   }
//   Fish.create(req.body, (err, createdFish) => {
//     Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(",")}, {new: true}, (err, createdFish) => {
//       res.redirect('/')
//     })
//   })
// })
//
// //--- NEW ROUTE
// app.get('/new', (req, res) => {
//   res.render('new.ejs')
// })
//
// //--- UPDATE ROUTE
// app.put('/:id', (req, res) => {
//   Fish.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedFish) => {
//     Fish.findByIdAndUpdate({_id: req.params.id}, {diet: req.body.diet.split(',')}, {new: true}, (err, updatedDish) => {
//       res.redirect('/')
//     })
//   })
// })
//
// //--- SHOW ROUTE
// app.get('/:id', (req, res) => {
//   Fish.findById(req.params.id, (err, foundFish) => {
//     res.render('show.ejs',
//       {
//         fishData: foundFish,
//       }
//     )
//   })
// })
//
// //--- Edit ROUTE
// app.get('/:id/edit', (req, res) => {
//   Fish.findById(req.params.id, (err, foundFish) => {
//     res.render('edit.ejs',
//       {
//         fishData: foundFish,
//       }
//     )
//   })
// })
//
// //--- DESTROY (DELETE) ROUTE
// app.delete('/:id', (req, res) => {
//   Fish.deleteOne({_id: req.params.id}, (err, deletedFish) => {
//     res.redirect('/')
//   })
// })


// //___________________
// //Models (need in original)
// //___________________
// const fishSeed = require('./models/seed.js') //seed data (original)
// const Fish = require('./models/schema.js') //schema (original)


// //homepage header try 1:
// <header>
//   <ul class="nav justify-content-end">
//     <li class="nav-item">
//       <p id="welcome-message" >Welcome <%=currentUser.currentUser.username%> </p>
//     </li>
//     <li class="nav-item">
//       <form id="form-in-header" action="/sessions/?_method=DELETE" method="POST">
//         <input id="logout-form" type="submit" value="Log Out" />
//       </form>
//     </li>
//   </ul>
// </header>

// //homepage header try 2:
// <nav class="navbar fixed-top bg-dark">
//   <div class="container-fluid">
//     <p>Welcome <%=currentUser.currentUser.username%> </p>
//   </div>
//   <div class="container-fluid">
//     <form id="form-in-header" action="/sessions/?_method=DELETE" method="POST">
//       <input id="logout-form" type="submit" value="Log Out" />
//     </form>
//   </div>
// </nav>


// //original edit route:
// animals.get('/:id/edit', isAuthenticated, (req, res) => {
//   Animal.findById(req.params.id, (err, foundAnimal) => {
//     res.render('animal/edit.ejs',
//       {
//         animalData: foundAnimal,
//         currentUser: req.session,
//       }
//     )
//   })
// })



// //Original Header:
// <div class="flex-box-header">
//   <div class="front-btns">
//     <a href="/home"/><button id="home-btn" type="button" name="button">Home</button></a>
//   </div>
//   <div class="front-btns">
//     <a href="/aquarium"/><button id="species-btn" type="button" name="button">Species</button></a>
//   </div>
//   <div class="front-btns">
//     <a href="/animal"/><button id="animals-btn" type="button" name="button">Animals</button></a>
//   </div>
//   <div class="front-btns">
//     <a href="/map"/><button id="map-btn" type="button" name="button">Oceans</button></a>
//   </div>
//   <div class="middle-section">
//     <p id="welcome-message">Welcome <%=currentUser.currentUser.username%>     </p>
//   </div>
//   <div class="end-btns">
//     <form id="form-in-header" action="/sessions/?_method=DELETE" method="POST">
//       <button id="logout-btn" type="submit" name="button">Log Out</button>
//     </form>
//   </div>
// </div>


// //Original animal header:
// <nav id="animal-header-navbar" class="navbar sticky-top" style="background-color: #ebf5fb;">
//   <div id="animal-nav-header" class="container-fluid">
//     <a id="home-link" class="nav-link mr-auto active" href="/home">Home</a>
//     <a id="species-link" class="nav-link mr-2" href="/aquarium">Species</a>
//
//     <p id="welcome-message" class="navbar-text mr-4">Welcome <%=currentUser.currentUser.username%> </p>
//     <form action="/sessions/?_method=DELETE" method="POST">
//       <button id="animal-logout-btn" class="btn btn-light" type="submit" name="button">Log out</button>
//     </form>
//   </div>
// </nav>


// //Sorta working header code:
// <div class="mobile-header-div">
//   <div id='open' class="hamburger-lines2">
//     <span class="line"></span>
//     <span class="line"></span>
//     <span class="line"></span>
//   </div>
//   <div id='close' class="hamburger-lines2">
//     <span class="line"></span>
//     <span class="line"></span>
//     <span class="line"></span>
//   </div>
//   <div class="dropdown-menu">
//     <a href="/home"/><button class="btn-2" id="home-btn2" type="button" name="button">Home</button></a>
//     <a href="/aquarium"/><button class="btn-2" id="species-btn2" type="button" name="button">Species</button></a>
//     <a href="/animal"/><button class="btn-2" id="animals-btn2" type="button" name="button">Animals</button></a>
//     <a href="/map"/><button class="btn-2" id="map-btn2" type="button" name="button">Oceans</button></a>
//     <form id="form-in-header2" action="/sessions/?_method=DELETE" method="POST">
//       <button class="btn-2" id="logout-btn2" type="submit" name="button">Log Out</button>
//     </form>
//   </div>
// </div>
//
// <div class="flex-box-header">
//   <div class="front-btns">
//     <a href="/home"/><button id="home-btn" type="button" name="button">Home</button></a>
//   </div>
//   <div class="front-btns">
//     <a href="/aquarium"/><button id="species-btn" type="button" name="button">Species</button></a>
//   </div>
//   <div class="front-btns">
//     <a href="/animal"/><button id="animals-btn" type="button" name="button">Animals</button></a>
//   </div>
//   <div class="front-btns">
//     <a href="/map"/><button id="map-btn" type="button" name="button">Oceans</button></a>
//   </div>
//   <div class="middle-section">
//     <p id="welcome-message">Welcome <%=currentUser.currentUser.username%>     </p>
//   </div>
//   <div class="end-btns">
//     <form id="form-in-header" action="/sessions/?_method=DELETE" method="POST">
//       <button id="logout-btn" type="submit" name="button">Log Out</button>
//     </form>
//   </div>
// </div>
//
//
//
// <script>
//   $(() => {
//     $('#close').hide()
//     $('.dropdown-menu').hide()
//
//     $('#open').click( () => {
//       $('#open').hide()
//       $('#close').show()
//       $('.dropdown-menu').show()
//     })
//
//     $('#close').click( () => {
//       $('#close').hide()
//       $('#open').show()
//       $('.dropdown-menu').hide()
//     })
//   });
// </script>


// //Aquarium original show route:
// router.get('/:id', isAuthenticated, (req, res) => {
//   Fish.findById(req.params.id, (err, foundFish) => {
//     res.render('aquarium/show.ejs',
//       {
//         fishData: foundFish,
//         currentUser: req.session,
//       }
//     )
//   })
// })


//unique username try ? (tried many things but forgot to save them):
// users.post('/', (req, res) => {
//   for (let i = 0; i < currentUser.currentUser.length; i++) {
//     if (currentUser.username == currentUser.currentUser.username) {
//       res.send('Username is already taken, try again')
//     } else {
//       req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//       User.create(req.body, (err, createdUser) => {
//         //res.send(createdUser)
//         console.log('user is created', createdUser)
//         res.redirect('/sessions/new')
//       })
//     }
//   }
// })



// // 2 Models try:
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
//
//
// const animalSchema = new Schema (
//   {
//     animalName: {type: String, required: true},
//     age: {type: String, required: true},
//     species: {type: String, required: true},
//     animalImg: String
//   }
// )
//
//
// const fishSchema = new Schema (
//
//   {
//     name: {type: String, required: true},
//     scientificName: String,
//     description: {type: String, required: true},
//     animalType: {type: String, required: true},
//     range: {type: String, required: true},
//     img: String,
//     number: {type: Number, required: true},
//     diet: [String],
//     size: String,
//     animals: [animalSchema]
//   }
// )
//
//
// const Animal = mongoose.model('Animal', animalSchema)
// const Fish = mongoose.model('Fish', fishSchema)
//
//
// //module.exports = Animal
// //module.exports = Fish
//
// const squid = new Fish({
//   name: 'Squid',
//   scientificName: 'squid squid',
//   description: 'This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test.',
//   animalType: 'Fish',
//   range: 'Oceans',
//   img: '',
//   number: 2,
//   diet: ['test', 'test', 'test'],
//   size: 'Test'
// })
//
// const animals1 = new Animal({
//   animalName: 'Squidy',
//   age: 'test',
//   species: 'Squid',
// })
//
// squid.animals.push(animals1)
//
// squid.save()
// animals1.save()
//
// //nothing is happening
