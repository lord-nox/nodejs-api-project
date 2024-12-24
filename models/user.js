const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Naam is verplicht'], 
        validate: {
            validator: function(value) {
                return /^[A-Za-z\s]+$/.test(value); // Alleen letters en spaties toegestaan
            },
            message: 'De naam mag alleen letters en spaties bevatten'
        }
    },
    email: { 
        type: String, 
        required: [true, 'Email is verplicht'], 
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Ongeldig emailadres'] 
    },
    age: { 
        type: Number, 
        required: [true, 'Leeftijd is verplicht'], 
        min: [0, 'Leeftijd moet positief zijn'],
        max: [120, 'Leeftijd mag niet hoger zijn dan 120']
    },
});

module.exports = mongoose.model('User', userSchema);
