 
// Add modules and dependencies
const mongoose = require ('mongoose')
const express = require('express')

let router = require('express').Router()
let db = require('../models')

// // PETS
//GET all pets '/' assoc with one user 

//WORKS-TUESDAY
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
        console.log(pets)
    })
    .catch(err => {
        console.log('Error in GET ALL Pets route', err)
        res.status(503)
    })
})

router.get('/:id', (req, res) => {
    db.User.findById(req.user._id)
    .then(user => {

        //Null = falsey, on front end  --> if (goalPet)
        let goalPet = null
        for (let i = 0; i < user.pets.length; i++) {
            if (user.pets[i]._id == req.params.id) {
                goalPet = user.pets[i]
            }
        }
        res.send({ pet: goalPet })
    })
})


router.put('/:id', (req, res) => {
    db.User.findById(req.user._id)
    .then(user => {
        let thisPet = null
        for (let i = 0; i < user.pets.length; i++) {
            if (user.pets[i]._id == req.params.id) {
                thisPet = user.pets[i]
            }
            thisPet.name = req.body.name
            thisPet.typeOfAnimal = req.body.typeOfAnimal
            thisPet.breed = req.body.breed
            thisPet.age = req.body.age
            thisPet.sex = req.body.sex
            thisPet.petImage = req.body.petImage
        }

        user.save()
        res.send({ pet: thisPet})
    })
    .catch((err) => {
        console.log('error', err) 
    })
})

//POST '/' create new pet from form (include image)
router.post('/', (req, res) => {
    console.log(req.user)
    db.User.findById(req.user._id)
        .then(User => {
            console.log(`This is the user`, User)
            console.log(`And here are his pets`, User.pets)
            User.pets.push({
                name: req.body.name,
                typeOfAnimal: req.body.typeOfAnimal,
                breed: req.body.breed,
                age: req.body.age,
                sex: req.body.sex,
                petImage: req.body.image,
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
            res.status(200).send({pets: User.pets})
        })
        .catch(err => {
            console.log(err, 'Error')
        })
    })
})


//DELETE '/:id' delete a pet from a user's pet list
router.delete('/:id', (req, res) => {
    console.log(req.user)
    db.User.findById(req.user._id)
    .then(User => {
        console.log(User)
        User.pets.splice({
            _id: req.user.pets._id
        })
        User.save()
        .then(() => {
            res.status(204).send({pets: User.pets})
        })
        .catch(err => {
            console.log('Error when deleting pet')
        })
    })
})

// // MEDICAL SUMMARY ROUTES
//WORKING -TUESDAY
// GET - All medical records for single pet
router.get('/:id/medical', (req, res) => {
    db.User.findById(req.user._id)
    .then(User => {
        let petSummary = User.pets.summary
        console.log({pets: User.pets.summary})
        res.send(petSummary)
    })
    .catch(err => {
        console.log('error', err)
        res.render('error')
    })
})


// // TREATMENT ROUTES
// GET - All details of single treatment
router.get('/:id/treatment', (req, res) => {
    db.User.findById(req.user._id)
    .then(treatment => {
        console.log(User.pet.treatment)
        res.send(treatment)
    })
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
