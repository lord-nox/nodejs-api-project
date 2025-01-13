const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Naam is verplicht'],
    validate: {
      validator: function (value) {
        return /^[A-Za-z\s]+$/.test(value); // Alleen letters en spaties
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
  // Nieuw toegevoegd veld voor wachtwoord (niet plaintext opslaan, altijd gehashed!)
  password: {
    type: String,
    required: [true, 'Wachtwoord is verplicht']
  },
  age: {
    type: Number,
    required: [true, 'Leeftijd is verplicht'],
    min: [0, 'Leeftijd moet positief zijn'],
    max: [120, 'Leeftijd mag niet hoger zijn dan 120']
  },
  phone: {
    type: String,
    validate: {
      // Example: accept either +32 123 45 67 89 or a local format
        validator: function(value) {
            return /^(\+32\s?\d{2,3}\s?\d{2}\s?\d{2}\s?\d{2})|(\d{9,10})$/.test(value);
        },
      message: 'Telefoonnummer moet het formaat "+32 444 44 44 44" hebben.'
    },
    required: [true, 'Telefoonnummer is verplicht']
  }
});

module.exports = mongoose.model('User', userSchema);
