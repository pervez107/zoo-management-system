const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, 
    count: { type: Number, required: true, default: 1 },
    category: { type: String, required: true, enum: ['Mammals', 'Birds', 'Reptiles', 'Aquatic'] },
    born: { type: String, required: true },
    origin: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Animal', animalSchema);