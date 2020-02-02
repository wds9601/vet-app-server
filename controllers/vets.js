let router = require('express').Router()

// Display all vets
router.get('/', (req, res) => {
    db.Vet.find()
    .then(vets => {
        res.render('vets/index', { vets })
    })
    .catch(err => {
        console.log('error', err)
        res.render('error')
    })
})

// display one vet
router.get('/:id', (req, res) => {
    db.Vet.findById(req.params.id)
    .then(vet => {
        res.render('vets/show', { vet })
    })
    .catch(err => {
        console.log('error', err)
        res.render('error')
    })
})

module.exports = router