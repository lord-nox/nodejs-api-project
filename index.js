app.use(express.static('public'));


//Als setup-gedeelte
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Voor JSON-parsing

app.get('/', (req, res) => {
    res.send('Welkom bij je Node.js API!');
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});


//MongoDB verbinding-gedeelte
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/nodejs-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Verbonden met MongoDB');
}).catch((err) => {
    console.error('MongoDB-verbinding mislukt:', err.message);
});

