// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Pas onderstaande URI aan met je eigen MongoDB-connectie
    // Bijvoorbeeld: mongodb://localhost:27017/mijn-node-project
    await mongoose.connect('mongodb://localhost:27017/nodejs-api-project', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
