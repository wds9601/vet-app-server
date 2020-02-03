// // Add modules and dependencies
let router = require('express').Router()
let db = require('../models')

// PETS ROUTES
// GET all pets '/' assoc with one user 
router.get('/', (req, res) => {
    db.Pet.find({ owner: req.user._id})
    .then((pets) => {
        if (!pets) {
            return res.status(404).send({ message: 'No Pets' })
        }
        else {
        res.status(200).send(pets)
        }

    })
    .catch(err => {
        console.log('Error in GET ALL Pets route', err)
        res.status(503).send({message: 'Error finding pets'})
    })
})

//POST '/' create new pet from form (include image)
router.post('/', (req, res) => {
    db.Pet.create({
        owner: req.user._id,
        name: req.body.name,
        typeOfAnimal: req.body.typeOfAnimal,
        breed: req.body.breed,
        age: req.body.age,
        sex: req.body.sex,
        petImage: req.body.petImage,
        summary: {
            rabiesShot: req.body.rabiesShot,
            microchip: req.body.microchip
        },
        treatment: {
            treatment: req.body.treatment,
            treatmentDate: req.body.treatmentDate
        }
    })
    .then(newPet => {
        res.send({ newPet })
    })
    .catch(err => {
        console.log(err, 'Error')
    })
})

//GET single pet details
router.get('/:petId', (req, res) => {
    db.Pet.findById(req.params.petId)
    .then(pet => {
        console.log('Found pet:', pet)
        res.send( pet )
    })
    .catch(err => {
        console.log('Error', err)
        res.status(500).send({ message: 'Server error' })
    })
})



router.put('/:petId', (req, res) => {
    db.Pet.findById(req.params.petId)
    .then(thisPet => {
        console.log("Found thisPet:", thisPet)
        if (thisPet.owner == req.user._id) {
            thisPet.name = req.body.name
            thisPet.typeOfAnimal = req.body.typeOfAnimal
            thisPet.breed = req.body.breed
            thisPet.age = req.body.age
            thisPet.sex = req.body.sex
            thisPet.petImage = req.body.petImage
            
            thisPet.save().then(() => {
                console.log('Pet info saved')
                res.send({ thisPet })
            })
        }
        else {
            res.status(401).send({ message: 'NOT OWNER' })
        }
    })
    .catch((err) => {
        console.log('error', err) 
        res.send({ message: 'Server error' })
    })
})


//DELETE '/:id' delete a pet from a user's pet list
router.delete('/:petId', (req, res) => {
    db.Pet.remove({ owner: req.user._id, _id: req.params.petId})
    .then(() => {
        console.log('success?')
        res.send({message: 'Success'})
    })
    .catch(err => {
        console.log('Error when deleting pet')
        res.status(500).send({ message: 'Server error' })
    })
})

// MEDICAL SUMMARY ROUTES
// GET - All medical records for single pet
router.get('/:petId/medical', (req, res) => {
    db.Pet.findById(req.params.petId)
    .then(thisPet => {
        res.send({summary: thisPet.summary})
    })
    .catch(err => {
        console.log('Error when deleting pet', err)
        res.status(500).send({ message: 'Server error' })
    })
})

// PUT - Change the medical info of a single pet
router.put('/:petId/medical', (req, res) => {
    db.Pet.findById(req.params.petId)
    .then(thisPet => {
        if (thisPet.owner == req.user._id) {
            if (!thisPet.summary) {
                thisPet.summary = {}
            }
            thisPet.summary.rabiesShot = req.body.rabiesShot
            thisPet.summary.microchip = req.body.microchip
            thisPet.save().then(() => {
                res.send({ summary: thisPet.summary })
            })
            .catch(err => {
                console.log('bad save', err)
            })
        }
        else {
            res.status(400).send({ message: 'You are not the owner of the pet' })
        }
    })
    .catch((err) => {
        console.log('Error in PUT medical', err)
        res.status(500).send({ message: 'Server error'})
    })
})

// TREATMENT ROUTES
// GET - All treatment details for a single pet
router.get('/:petId/treatment', (req, res) => {
    db.Pet.findById(req.params.petId)
    .then(thisPet => {
        res.send({treatment: thisPet.treatment})
    })
    .catch((err) => {
        console.log('Error in GET treatment', err)
        res.status(500).send({message: 'server error'})
    })
})

// PUT - edit a pet treatment record that already exists
router.post('/:petId/treatment', (req, res) => {
    db.Pet.findById(req.params.petId)
    .then(thisPet => {
        console.log('Thispet', thisPet)
        if (thisPet.owner == req.user._id) {
            if (!thisPet.treatment) {
                thisPet.treatment = {}
            }
            thisPet.treatment.push({
                treatment: req.body.treatment,
                treatmentDate: req.body.treatmentDate,
            })
            thisPet.save().then(() => {
                res.send({ treatment: thisPet.treatment })
            })
        }
        else {
            res.status(400).send({ message: 'Not the owner of this pet'})
        }
        })
        .catch((err) => {
            console.log('Error in PUT treatment', err)
            res.status(500).send({ message: 'server error'})
        })
    })

module.exports = router