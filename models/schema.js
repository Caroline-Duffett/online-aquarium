const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fishSchema = new Schema (
  {
    name: {type: String, Required: true},
    scientificName: String,
    description: {type: String, Required: true},
    animalType: {type: String, Required: true},
    range: {type: String, Required: true},
    img: String,
    number: {type: Number, Required: true},
    diet: [String],
    Size: String
  }
)


const Fish = mongoose.model('Fish', fishSchema)

module.exports = Fish
