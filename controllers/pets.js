// Add modules and dependencies
const mongoose = require ('mongoose')
const express = require('express')

let router = require('express').Router()
let db = require('../models')

// // PETS
//GET all pets '/' assoc with one user 
router.get('/', (req, res) => {
    // res.send('GET all pets from a user')
    // console.log('Line 12', req.user.id, req.user._id)
    db.User.findById(req.user._id)
    .then((user) => {
        console.log('Line 15', user)
        if (!user) {
            return res.status(404).send({ message: 'No User' })
        }
        let pets = user.pets
        res.send(pets)
    })
    .catch(err => {
        console.log('Error in GET ALL Pets route', err)
        res.status(503)
    })
})

//GET '/new' form for adding new pet to a user
router.get('/new', (req, res) => {
    res.send('/new')
})

//GET '/:id' to view single pet by id
router.get('/:id', (req, res) => {
    // res.send('GET info on a single pet')
    db.User.findById(req.user._id)
    .then(user => {
        let pet = user.pet._id
        if(pet) {
            res.send(pet)
        }
        else {
            res.status(404).send('Resource not located')
        }
    })
    .catch(err => {
        console.log('Error in GET single pet route', err)
    })
})

//PUT '/:id' to edit pet data for one pet
router.put('/:id', (req, res) => {
    res.send('PUT route to edit pet data form')
})

//POST '/' create new pet from form (include image)
// res.send('POST route to add "new pet from" to db')
router.post('/', (req, res) => {
    console.log(req.user)
    db.User.findById(req.user._id)
        .then(User => {
            console.log(User)
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
        .then(() => {
            res.send({pets: User.pets})
        })
        .catch(err => {
            console.log(err, 'Error')
        })
    })
})


//DELETE '/:id' delete a pet from a user's pet list
router.delete('/:id', (req, res) => {
    res.send('DELETE route for removing a pet from a user')
})

// // MEDICAL SUMMARY ROUTES

// GET - All medical records for single pet

router.get('/:id/medical', (req, res) => {
    db.User.findById(req.params.id)
    .then(summary => {
        console.log(user.pet.summary)
        res.send(summary)
    })
    .catch(err => {
        console.log('error', err)
        res.render('error')
    })
})

// GET - pet's individual medical record details

router.get('/:id/medical/:id', (req, res) => {
    res.send('Display details of one medical record')
})


// PUT - edit pet's indvidual medical record
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
// GET - All details of single treatment
router.get('/:id/treatment', (req, res) => {
    db.User.findById(req.params.id)
    .then(treatment => {
        console.log(User.pet.treatment)
        res.send(treatment)
    })
})

// GET - display form for editing single pet treatment details
router.get('/:id/treatment/new', (req, res) => {
    res.send('Display form for editing one pet treatment')
})

// POST - create new pet treatment record
router.post('/:id/treatment', (req, res) => {
    db.User.create({
        treatment: req.body.user.pet.treatment,
        treatmentDate: req.body.user.pet.treatmentDate
        .then(treatment => {
            console.log(user.pet.treatment)
            res.redirect('/:id/treatment')
        })
        .catch(err => {
            console.log('error', err)
            res.render('error')
        })
    })
})

// PUT - edit a pet treatment record that already exists
router.put('/:id/treatment', (req, res)=> {
    db.User.findOneAndUpdate({
        _id: req.params.id
    },
        req.body,
    {
        new: true
    })
    .then(updatedTreatment => {
        res.redirect('/:id/treatment')
    })
    .catch(err => {
        console.log('error', err)
        res.render('error')
    })
})


module.exports = router