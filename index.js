// Importeer Express
const express = require('express');

// Importeer Mongoose voor MongoDB-verbinding
const mongoose = require('mongoose');

// Importeer routes
const userRoutes = require('./routes/user');
const newsPostRoutes = require('./routes/newsPost');

// Initialiseer de Express-app
const app = express();
const port = 3000;

// Middleware om statische bestanden te serveren (bijvoorbeeld de public map)
app.use(express.static('public'));

// Middleware om JSON-requests te verwerken
app.use(express.json());

// MongoDB-verbinding
mongoose.connect('mongodb://127.0.0.1:27017/nodejs-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

// Basisroute
app.get('/', (req, res) => {
    res.send('Welkom bij je Node.js API!');
});

// Koppelen van gebruikersroutes aan de server
app.use('/users', userRoutes);
app.use('/newsPosts', newsPostRoutes);

// Start de server
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
