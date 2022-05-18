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


//Took out footer
// <footer>
//   <div class="footer-div">
//
//   </div>
// </footer>

// /*
// footer {
//   background-color: #ebf5fb;
//   width: 100%;
//   bottom: 0px;
//   left: 0px;
//   height: 85px;
//   box-shadow: 0 -1px 4px rgba(0,0,0,0.4);
//   position: absolute;
// }
// */


// //Nav without jQuery:
// <nav class='show-page-bottom-nav'>
//   <a id="edit-link" href="/<%=fishData._id%>/edit"/> <button id="edit-btn"  type="button" name="button">Edit</button></a>
//   <form id="form-link" action='/<%=fishData._id%>?_method=DELETE' method='POST'>
//     <input id="delete-btn" type="submit" value="Delete">
//   </form>
// </nav>

// //css:
// .show-page-bottom-nav {
//   display: flex;
//   flex-wrap: nowrap;
//   flex-direction: row;
//   justify-content: space-evenly;
//   margin-top: 3%;
//   margin-left: auto;
//   margin-right: auto;
//   width: 20%;
// }


// //logout header try 1
// <% if (currentUser) { %>
//   <form action="/sessions?_method=DELETE" method="POST">
//     <input type="submit" value="Log Out" />
//   </form>
// <% } else { %>
//   <a href="/users/new">Create Account</a>
//   <a href="/sessions/new">Login</a>
// <% } %>


// // // header links
// <a href="/users/new">Create Account</a>
// <a href="/sessions/new">Login</a>


//original create new animal form:
// <form class="animal-form" action="/animal" method="POST">
//   <div class="form-row">
//     <label for="animalname">Name: </label>
//     <input type="text" name="animalname" required/>
//   </div>
//   <div class="form-row">
//     <label for="animalage">Age: </label>
//     <input type="text" name="animalage" required/>
//   </div>
//   <div class="form-row">
//     <label for="species">Species: </label>
//     <input type="text" name="species" required/>
//   </div>
//   <input class='animal-form-button' type="submit" value="Create Animal"/>
// </form>


//original animal edit form submit button:
//<input type="submit" value="Create Animal"/>



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


// //orginal animal devete form
// <form action='/animal/<%=animalData._id%>?_method=DELETE' method='POST'>
//   <input id="delete-btn" type="submit" value="Delete">
// </form>

// //original logout form
// <form id="form-in-header" action="/sessions/?_method=DELETE" method="POST">
//   <input id="logout-form" type="submit" value="Log Out"/>
// </form>


// //Original Animal index page:
// <div class="container-fluid">
//   <div class="container-fluid">
//       <a href="/animal/new"><button type="button" name="button">Create New Animal</button></a>
//   </div>
//
//
//   <h1>Animal Index Page</h1>
//
//   <% for (let i = 0; i < animalData.length; i++) { %>
//     <div id="animal-name-container" class="container-sm" style="background-color: white;">
//       <a href="/animal/<%=animalData[i]._id%>">
//       <div class="animal-name-img-div">
//         <img src="<%= animalData[i].animalImg %>" alt="">
//         <h3 id='animal-name'><%= animalData[i].animalName %></h3>
//       </div>
//       </a>
//     </div>
//   <% } %>
// </div>

// //original animal show page btns
// <div class="show-page-btns">
//   <a href="/animal/<%=animalData._id%>/edit"/><button id="edit-btn" class="btn btn-light" type="button" name="button">Edit</button></a>
//   <form action='/animal/<%=animalData._id%>?_method=DELETE' method='POST'>
//     <button id=animal-delete-btn class="btn btn-light" type="submit" name="button">Delete</button>
//   </form>
// </div>


// // //original animal new submit button:
// <input class='animal-form-button' type="submit" value="Create Animal"/>


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
