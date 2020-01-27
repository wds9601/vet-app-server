// Require mongoose node module
const mongoose = require('mongoose')

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
    image: String
})

// Exporting model
module.exports = mongoose.model('Pet', petSchema)