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



    // res.send('PUT route to edit pet data form')
})

//TODO: POST '/' create new pet from form (include image)
router.post('/', (req, res) => {
    db.User.findById(req.params.id)
    .then(User => {
        User.pets.push({
            name: req.body.name,
            typeOfAnimal: req.body.typeOfAnimal,
            breed: req.body.breed,
            age: req.body.age,
            sex: req.body.sex,
            image: req.body.image,
            summary: {
                rabiesShot: req.body.rabiesShot,
                microchip: req.body.microchip
            },
            treatment: {
                treatment: req.body.treatment,
                treatmentDate: req.body.treatmentDate
            }
        })
        User.save()
    .then(newPet => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err, 'Error')
    })
})

//     name: {
//         type: String,
//         required: true
//     },
//     typeOfAnimal: {
//         type: String,
//         required: true
//     },
//     breed: {
//         type: String,
//         required: true
//     },
//     age: Number,
//     sex: String,
//     image: String,
//     summary: summarySchema,
//     treatment: treatmentSchema,
//     vet: {type: mongoose.Schema.Types.ObjectId, ref: 'Vet'}
//   })


    res.send(req.body)
})

//TODO: DELETE '/:id' delete a pet from a user's pet list
router.delete('/:id', (req, res) => {
    res.send('DELETE route for removing a pet from a user')
})

// // MEDICAL SUMMARY ROUTES
router.get('/:id/medical', (req, res) => {
    res.send('Medical records info for a single pet')
})

router.get('/:id/medical/:id', (req, res) => {
    res.send('Display details of one medical record')
})

router.put('/:id/medical/:id', (req, res) => {
    res.send('edit details of one medical record')
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