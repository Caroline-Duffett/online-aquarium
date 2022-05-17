const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js') //schema for username and password


//Two Routes for user:

//Brings user to signup page
users.get('/new', (req, res) => {
  res.render('../views/users/newaccount.ejs')
})

//Created new user
users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    //res.send(createdUser)
    console.log('user is created', createdUser)
    res.redirect('/aquarium')
  })
})

module.exports = users
