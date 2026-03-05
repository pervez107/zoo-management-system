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

// Add new animal
const addAnimal = async (req, res) => {
    try {
        const { name, species, description, image, count, category, born, origin } = req.body;
        const newAnimal = await Animal.create({ 
            name, species, description, image, count, category, born, origin 
        });
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// NEW: Delete an animal
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