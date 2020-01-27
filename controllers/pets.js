//TODO: 
// add modules and dependencies
const mongoose = require ('mongoose')
const express = require('express')
let express = express()

let db = require('../models')

//TODO: GET all pets '/' assoc with one user
router.get('/', (req, res) => {
    res.send('GET all pets from a user')
})

//TODO: GET '/new' form for adding new pet to a user
router.get('/new', (req, res) => {
    res.send('GET new form for adding a new pet')
})

//TODO: GET '/:id' to view single pet by id
router.get('/:id', (req, res) => {
    res.send('GET info on a single pet')
})

//TODO: PUT '/:id' to edit pet data for one pet
router.put('/:id', (req, res) => {
    res.send('PUT route to edit pet data form')
})

//TODO: POST '/' create new pet from form (include image)
router.post('/', (req, res) => {
    res.send('POST route to add "new pet from" to db')
})

//TODO: DELETE '/:id' delete a pet from a user's pet list
router.delete('/:id', (req, res) => {
    res.send('DELETE route for removing a pet from a user')
})

module.exports = router