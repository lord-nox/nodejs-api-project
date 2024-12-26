const express = require('express');
const User = require('../models/user'); // Import the User model
const router = express.Router();

// 1. Fetch users with limit and offset
router.get('/paginated', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const users = await User.find()
            .skip(offset)
            .limit(limit);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users with pagination',
            error: error.message
        });
    }
});
// 2. Search users by a field (e.g., name or email)
router.get('/search', async (req, res) => {
    try {
        const { name, email } = req.query; // Haal de zoekparameters op

        let query = {};

        // Stel dynamisch de zoekvoorwaarden op
        if (name) {
            query.name = new RegExp(name, 'i'); // Zoek naam (case-insensitive)
        }
        if (email) {
            query.email = new RegExp(email, 'i'); // Zoek e-mail (case-insensitive)
        }

        const users = await User.find(query); // Zoek gebruikers in MongoDB
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error searching users',
            error: error.message,
        });
    }
});

// Advanced search for users by multiple fields
router.get('/advanced-search', async (req, res) => {
    try {
        const { name, email, phone } = req.query;

        // Build query dynamically
        let query = {};
        if (name) query.name = new RegExp(name, 'i'); // Partial case-insensitive match
        if (email) query.email = new RegExp(email, 'i'); // Partial case-insensitive match
        if (phone) query.phone = new RegExp(phone.replace(/\s+/g, '\\s*'), 'i'); // Handle spaces in phone numbers

        // Log query and database content for debugging
        console.log('Query:', query);
        console.log('Database Content:', await User.find());

        const users = await User.find(query); // Execute query
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error performing advanced user search',
            error: error.message,
        });
    }
});

// 3. Fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        });
    }
});

// 4. Fetch a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
});

// 5. Add a new user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate request body
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const user = new User(req.body); // Create a new user
        await user.save(); // Save user to the database
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: 'Error adding user',
            error: error.message
        });
    }
});

// 6. Update an existing user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating user',
            error: error.message
        });
    }
});

// 7. Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
});

module.exports = router;
