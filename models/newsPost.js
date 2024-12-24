const mongoose = require('mongoose');

// Schema-definitie voor een NewsPost
const newsPostSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Titel van de nieuwsbericht
    content: { type: String, required: true }, // Inhoud van het nieuwsbericht
    author: { type: String, required: true }, // Auteur van het nieuwsbericht
    createdAt: { type: Date, default: Date.now }, // Datum en tijd van creatie
});

// Exporteren van het model
module.exports = mongoose.model('NewsPost', newsPostSchema);
