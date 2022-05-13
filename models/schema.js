const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fishSchema = new Schema (
  {
    name: {type: String, required: true},
    scientificName: String,
    description: {type: String, required: true},
    animalType: {type: String, required: true},
    range: {type: String, required: true},
    img: String,
    number: {type: Number, required: true},
    diet: [String],
    size: String
  }
)


const Fish = mongoose.model('Fish', fishSchema)

module.exports = Fish
