const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  born: { type: String }, // CHANGED from 'age' to 'born' to match Frontend
  gender: { type: String },
  origin: { type: String },
  funFacts: { type: String },
  behavior: { type: String },
  conservationStatus: { type: String }
});

module.exports = mongoose.model('Animal', animalSchema);