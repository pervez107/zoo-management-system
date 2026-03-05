const express = require('express');
const router = express.Router();
const { getAnimals, addAnimal, deleteAnimal } = require('../contollers/animalController');

// Routes
router.route('/').get(getAnimals).post(addAnimal);
router.route('/:id').delete(deleteAnimal); 

module.exports = router;