// index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const userRoutes = require('./routes/user');
const newsRoutes = require('./routes/newsPost');
const authRoutes = require('./routes/auth'); // Voor login/register

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statische bestanden (HTML, CSS, JS)
app.use(express.static('public')); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes); // login en register

// Root endpoint -> toon index.html (documentatie)
app.get('/', (req, res) => {
  // Dit zal automatisch 'public/index.html' renderen als je / bezoekt
  // of doe expliciet:
  // res.sendFile(__dirname + '/public/index.html');
  res.sendFile('index.html', { root: __dirname + '/public' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
