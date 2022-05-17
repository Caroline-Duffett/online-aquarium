const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js') //schema for username and password


//Two Routes for user:

//Brings user to signup page
users.get('/new', (req, res) => {
  res.render('../views/users/newaccount.ejs',
  {
    currentUser: req.session,
  })
})

//Creates new user
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/sessions/new')
  })
})



module.exports = users



//Graveyard:
//unique username try 1:
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
