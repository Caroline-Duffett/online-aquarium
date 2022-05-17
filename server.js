//___________________
//Dependencies
//___________________
const express = require('express')
const methodOverride  = require('method-override')
const controller = require('./controllers/routes.js'); //not in original version
const mongoose = require ('mongoose')
const app = express ()
const db = mongoose.connection
require('dotenv').config()

const userController = require('./controllers/users_controller.js') //for Auth new account

const session = require('express-session')

const sessionsController = require('./controllers/sessions_controller.js')


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






//___________________
//Routes
//___________________
app.use('/aquarium', controller) //Crud Routes

app.use('/users', userController) //For create account

//For Auth
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

app.use('/sessions', sessionsController) //for sessions




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
