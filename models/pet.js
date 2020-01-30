let mongoose = require('mongoose')

// Creating Summary model
const summarySchema = new mongoose.Schema({
  rabiesShot: String,
  microchip: Number
})

// Creating Treatment model
const treatmentSchema = new mongoose.Schema({
  treatment: String,
  treatmentDate: Number
})

// Creating Pet model
const petSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {
        type: String,
        required: true
    },
    typeOfAnimal: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: Number,
    sex: String,
    petImage: String,
    summary: summarySchema,
    treatment: [treatmentSchema],
    vet: {type: mongoose.Schema.Types.ObjectId, ref: 'Vet'}
  })

  module.exports = mongoose.model('Pet', petSchema)
