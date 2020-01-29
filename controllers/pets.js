 
// // Add modules and dependencies
// const mongoose = require ('mongoose')
// const express = require('express')

let router = require('express').Router()
let db = require('../models')
let jwt = require('jsonwebtoken')

// // PETS
//GET all pets '/' assoc with one user 
router.get('/', (req, res) => {
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
            return User.save()
        .then(() => {
            let token = jwt.sign(User.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 8 // 60 seconds
            })
            res.send({token})
        })
        .catch(err => {
            console.log(err, 'Error')
        })
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
    .then(user => {
        let thisPet = null;
        for (let i = 0; i < user.pets.length; i++) {
            if (user.pets[i]._id == req.params.id) {
                thisPet = user.pets[i]
            }
        }
        res.send({summary: thisPet.summary})
    })
    .catch(err => {
        console.log('error', err)
    })
})
router.put('/:id/medical', (req, res) => {
    db.User.findById(req.user._id)
    .then(User => {
        let thisPet = null
        for (let i = 0; i< User.pets.length; i++) {
            if (User.pets[i]._id == req.params.id) {
                thisPet = User.pets[i]
            }
        }
        console.log("LINE 152", thisPet)
        thisPet.summary.rabiesShot = req.body.rabiesShot,
        thisPet.summary.microchip = req.body.microchip
        User.save()
        .then(() => {
            res.status(200).send({summary: thisPet.summary })
        })
        .catch((err) => {
            console.log('Error in PUT medical', err)
        })
    })
})


router.post('/:id/medical', (req, res) => {
    db.User.findById(req.user._id)
    .then(User => {
        let thisPet = null
        for (let i = 0; i < User.pets.length; i++) {
            if (User.pets[i]._id == req.params.id) {
                thisPet = User.pets[i]
            }
        }
        thisPet.summary.rabiesShot = req.body.rabiesShot
        thisPet.summary.microchip = req.body.microchip
        User.save()
        .then(() => {
            res.status(200).send({summary: thisPet.summary})
        })
        .catch((err) => {
            console.log('error in POST medical', err)
        })
    })
})

// // TREATMENT ROUTES
// GET - All treatment details for a single pet
router.get('/:id/treatment', (req, res) => {
    db.User.findById(req.user._id)
    .then(user => {
        let thisPet = null
        for (let i = 0; i < user.pets.length; i++) {
            if (user.pets[i]._id == req.params.id) {
                thisPet = user.pets[i]
            }
        }
        
        res.send({treatment: thisPet.treatment})
    })
    .catch((err) => {
        console.log('Error in GET treatment', err)
    })
})

// POST - create new pet treatment record
router.post('/:id/treatment', (req, res) => {
    db.User.findById(req.user._id)
    .then(User => {
        let thisPet = null
        for (let i = 0; i < User.pets.length; i++) {
            if (User.pets[i]._id == req.params.id) {
                thisPet = User.pets[i]
            }
        }
        thisPet.treatment.treatment = req.body.treatment,
        thisPet.treatment.treatmentDate = req.body.treatmentDate

        User.save()
        .then(() => {
            res.status(200).send({pet: User.pets })
        })
        .catch((err) => {
            console.log('error in POST treatment', err)
        })
    })
})

// PUT - edit a pet treatment record that already exists
router.put('/:id/treatment', (req, res) => {
    db.User.findById(req.user._id)
    .then(User => {
        let thisPet = null
        for (let i = 0; i < user.pets.length; i++) {
            if (user.pets[i]._id == req.params.id) {
                thisPet = user.pets[i]
            }
        }
        thisPet.treatment.treatment = req.body.treatment,
        thisPet.treatment.treatmentDate = req.body.treatmentDate

        User.save()
        .then(() => {
            res.status(200).send({ pet: User.pets })
        })
        .catch((err) => {
            console.log('error in PUT treatment', err)
        })
    })  
})


module.exports = router
