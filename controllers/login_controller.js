const bcrypt = require('bcrypt')
const express = require('express')
const login = express.Router()

login.get('/', (req, res) => {
  res.render('../views/login.ejs')
})

module.exports = login
