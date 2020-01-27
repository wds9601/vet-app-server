// Display all vets
router.get('/', (req, res) => {
    res.send('Display all vets')
})

// display one vet
router.get('/:id', (req, res) => {
    res.send('Display one vet details')
})