const mongoose = require('mongoose')
const Schema = mongoose.Schema

const animalSchema = new Schema (
  {
    animalName: {type: String, required: true},
    age: {type: String, required: true},
    species: {type: String, required: true},
    animalImg: String
  }
)


const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal
