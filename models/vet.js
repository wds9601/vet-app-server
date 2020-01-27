// Require mongoose node module
const mongoose = require('mongoose')

// Creating the Vet model
const vetSchema = new mongoose.Schema({
    pet: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
    name: String,
    address: String,
    phoneNumber: Number
})

// Exporting model
module.exports = mongoose.model('Vet', vetSchema)