

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