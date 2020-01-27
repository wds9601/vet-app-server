//TODO: 
// add modules and dependencies
const mongoose = require ('mongoose')
const express = require('express')

let router = require('express').Router()
let db = require('../models')

// // PETS
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

// // MEDICAL SUMMARY ROUTES
// Router to get the medical summary for a pet
router.get('/:id/medical', (req, res) => {
    db.User.findById(req.params.id)
    .then(summary => {
        console.log(user.pet.summary)
        res.render('/:id/medical', { summary })
    })
    .catch(err => {
        console.log('error', err)
        res.render('error')
    })
})

// Router to get a single record for a pet (Do we need?)
router.get('/:id/medical/:id', (req, res) => {
    res.send('Display details of one medical record')
})

router.put('/:id/medical/:id', (req, res) => {
    db.User.findOneAndUpdate({
        _id: req.params.id
    }, 
        req.body,
    {
        new: true
    })
    .then(updatedSummary => {
        console.log(updatedSummary)
        res.redirect('/:id/medical/:id')
    })
    .catch(err => {
        console.log('error', err)
        res.render('error')
    })
})


// // TREATMENT ROUTES
router.get('/:id/treatment', (req, res) => {
    res.send('Display deatils of a treatment')
})

router.get('/:id/treatment/new', (req, res) => {
    res.send('Display form for editing one pet treatment')
})

router.post('/:id/treatment', (req, res) => {
    res.send('Update pet treatment, redirect back to /:id/treatment')
})


module.exports = router