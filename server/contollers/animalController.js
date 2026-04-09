const Animal = require('../models/Animal');

// Get all animals
const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find({}).sort({ createdAt: -1 });
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new animal (UPDATED to include all new fields)
const addAnimal = async (req, res) => {
    try {
        // 1. Destructure ALL fields coming from the frontend (Admin.jsx)
        const { 
            name, species, description, image, count, 
            category, born, origin, gender, funFacts, 
            behavior, conservationStatus 
        } = req.body;

        // 2. Create the animal with ALL fields
        const newAnimal = await Animal.create({ 
            name, species, description, image, count, 
            category, born, origin, gender, funFacts, 
            behavior, conservationStatus
        });
        
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an animal
const deleteAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByIdAndDelete(req.params.id);
        if (animal) {
            res.json({ message: "Animal removed successfully" });
        } else {
            res.status(404).json({ message: "Animal not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAnimals, addAnimal, deleteAnimal };