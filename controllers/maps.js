const bcrypt = require('bcrypt')
const express = require('express')
const map = express.Router()

//Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/')
  }
}

map.get('/', isAuthenticated, (req, res) => {
  res.render('../views/map.ejs',
  {
    currentUser: req.session,
  })
})

module.exports = map
