// Require mongoose node module
const mongoose = require('mongoose')

// Creating Summary model
const summarySchema = new mongoose.Schema({
    rabiesShot: String,
})

// Creating Treatment model
const treatmentSchema = new mongoose.Schema({
    treatment: String,
    treatmentDate: Number
})

// Creating Pet model
const petSchema = new mongoose.Schema({
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
    microchip: Number,
    image: String,
    summary: summarySchema,
    treatment: treatmentSchema
})

// Exporting model
module.exports = mongoose.model('Pet', petSchema)