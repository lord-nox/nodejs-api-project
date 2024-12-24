const express = require('express');
const NewsPost = require('../models/newsPost');
const router = express.Router();

// 1. Haal een lijst van alle nieuwsberichten op
router.get('/', async (req, res) => {
    try {
        const newsPosts = await NewsPost.find();
        res.status(200).json(newsPosts);
    } catch (error) {
        res.status(500).json({ message: 'Fout bij ophalen van nieuwsberichten', error });
    }
});

// 2. Haal details van een specifiek nieuwsbericht op
router.get('/:id', async (req, res) => {
    try {
        const newsPost = await NewsPost.findById(req.params.id);
        if (!newsPost) return res.status(404).json({ message: 'Nieuwsbericht niet gevonden' });
        res.status(200).json(newsPost);
    } catch (error) {
        res.status(500).json({ message: 'Fout bij ophalen van nieuwsbericht', error });
    }
});

// 3. Voeg een nieuw nieuwsbericht toe
router.post('/', async (req, res) => {
    try {
        const newsPost = new NewsPost(req.body);
        await newsPost.save();
        res.status(201).json(newsPost);
    } catch (error) {
        res.status(400).json({ message: 'Fout bij toevoegen van nieuwsbericht', error });
    }
});

// 4. Update een bestaand nieuwsbericht
router.put('/:id', async (req, res) => {
    try {
        const newsPost = await NewsPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!newsPost) return res.status(404).json({ message: 'Nieuwsbericht niet gevonden' });
        res.status(200).json(newsPost);
    } catch (error) {
        res.status(400).json({ message: 'Fout bij bijwerken van nieuwsbericht', error });
    }
});

// 5. Verwijder een nieuwsbericht
router.delete('/:id', async (req, res) => {
    try {
        const newsPost = await NewsPost.findByIdAndDelete(req.params.id);
        if (!newsPost) return res.status(404).json({ message: 'Nieuwsbericht niet gevonden' });
        res.status(200).json({ message: 'Nieuwsbericht verwijderd' });
    } catch (error) {
        res.status(500).json({ message: 'Fout bij verwijderen van nieuwsbericht', error });
    }
});

module.exports = router;
