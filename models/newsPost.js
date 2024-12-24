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
    startDate: {
        type: Date,
        required: [true, 'Startdatum is verplicht']
    },
    endDate: {
        type: Date,
        required: [true, 'Einddatum is verplicht'],
        validate: {
            validator: function(value) {
                return value > this.startDate; // Controleer of endDate na startDate ligt
            },
            message: 'Einddatum moet na de startdatum liggen.'
        }
    },
});

module.exports = mongoose.model('NewsPost', newsPostSchema);
