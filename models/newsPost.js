const mongoose = require('mongoose');

const newsPostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Titel is verplicht'],
        minlength: [5, 'Titel moet minimaal 5 tekens bevatten']
    },
    content: { 
        type: String, 
        required: [true, 'Inhoud is verplicht'], 
        minlength: [10, 'Inhoud moet minimaal 10 tekens bevatten']
    },
    author: { 
        type: String, 
        required: [true, 'Auteur is verplicht'] 
    },
});

module.exports = mongoose.model('NewsPost', newsPostSchema);
