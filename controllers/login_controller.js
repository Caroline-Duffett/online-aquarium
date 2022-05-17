const bcrypt = require('bcrypt')
const express = require('express')
const login = express.Router()

// //Middleware
// const isAuthenticated = (req, res, next) => {
//   if (req.session.currentUser) {
//     return next()
//   } else {
//     res.redirect('/')
//   }
// }

login.get('/', (req, res) => {
  res.render('../views/login.ejs')
})

module.exports = login
