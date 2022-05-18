// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
//
//
// const animalSchema = new Schema (
//   {
//     animalName: {type: String, required: true},
//     age: {type: String, required: true},
//     species: {type: String, required: true},
//     animalImg: String
//   }
// )
//
//
// const fishSchema = new Schema (
//
//   {
//     name: {type: String, required: true},
//     scientificName: String,
//     description: {type: String, required: true},
//     animalType: {type: String, required: true},
//     range: {type: String, required: true},
//     img: String,
//     number: {type: Number, required: true},
//     diet: [String],
//     size: String,
//     animals: [animalSchema]
//   }
// )
//
//
// const Animal = mongoose.model('Animal', animalSchema)
// const Fish = mongoose.model('Fish', fishSchema)
//
//
// //module.exports = Animal
// //module.exports = Fish
//
// const squid = new Fish({
//   name: 'Squid',
//   scientificName: 'squid squid',
//   description: 'This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test. This is a test.',
//   animalType: 'Fish',
//   range: 'Oceans',
//   img: '',
//   number: 2,
//   diet: ['test', 'test', 'test'],
//   size: 'Test'
// })
//
// const animals1 = new Animal({
//   animalName: 'Squidy',
//   age: 'test',
//   species: 'Squid',
// })
//
// squid.animals.push(animals1)
//
// squid.save()
// animals1.save()
//
// //nothing is happening
