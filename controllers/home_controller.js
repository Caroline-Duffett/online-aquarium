const bcrypt = require('bcrypt')
const express = require('express')
const home = express.Router()

//Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/')
  }
}


home.get('/', isAuthenticated, (req, res) => {
  res.render('../views/index.ejs',
  {
        currentUser: req.session
  })
})

module.exports = home
