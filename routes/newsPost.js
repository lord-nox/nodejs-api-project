const express = require('express');
const NewsPost = require('../models/newsPost');
const router = express.Router();

// Advanced search for news posts by multiple fields
router.get('/advanced-search', async (req, res) => {
    try {
        const { title, author, startDate, endDate } = req.query;

        let query = {};

        // Case-insensitive search for title
        if (title) query.title = { $regex: title, $options: 'i' };

        // Case-insensitive search for author
        if (author) query.author = { $regex: author, $options: 'i' };

        // Date range filtering for startDate and endDate
        if (startDate || endDate) {
            query.startDate = {};
            if (startDate) query.startDate.$gte = new Date(startDate); // Greater or equal to start date
            if (endDate) query.startDate.$lte = new Date(endDate); // Less or equal to end date
        }

        const newsPosts = await NewsPost.find(query);

        // Format the dates for each news post
        const formattedNewsPosts = newsPosts.map(post => ({
            ...post._doc,
            startDate: post.startDate ? post.startDate.toISOString().split('T')[0] : undefined,
            endDate: post.endDate ? post.endDate.toISOString().split('T')[0] : undefined,
        }));

        res.status(200).json(formattedNewsPosts);
    } catch (error) {
        res.status(500).json({
            message: 'Error performing advanced news post search',
            error: error.message,
        });
    }
});

// 1. Fetch all news posts and make dates human-readable
router.get('/', async (req, res) => {
    try {
        const newsPosts = await NewsPost.find();

        // Format the dates for each news post
        const formattedNewsPosts = newsPosts.map(post => ({
            ...post._doc,
            startDate: post.startDate ? post.startDate.toISOString().split('T')[0] : undefined,
            endDate: post.endDate ? post.endDate.toISOString().split('T')[0] : undefined,
        }));

        res.status(200).json(formattedNewsPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news posts', error });
    }
});

// 2. Fetch a news post by ID
router.get('/:id', async (req, res) => {
    try {
        const newsPost = await NewsPost.findById(req.params.id);
        if (!newsPost) return res.status(404).json({ message: 'News post not found' });
        res.status(200).json(newsPost);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news post', error });
    }
});

// 3. Fetch news posts with limit and offset
router.get('/paginated', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const newsPosts = await NewsPost.find()
            .skip(offset)
            .limit(limit);

        // Format the dates for each news post
        const formattedNewsPosts = newsPosts.map(post => ({
            ...post._doc,
            startDate: post.startDate ? post.startDate.toISOString().split('T')[0] : undefined,
            endDate: post.endDate ? post.endDate.toISOString().split('T')[0] : undefined,
        }));

        res.status(200).json(formattedNewsPosts);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching news posts with pagination',
            error: error.message,
        });
    }
});

// 4. Add one or multiple news posts
router.post('/', async (req, res) => {
    try {
        const newsPosts = Array.isArray(req.body) ? req.body : [req.body];

        // Validate each news post
        for (const post of newsPosts) {
            const { title, content, author, startDate, endDate } = post;

            if (!title || !content || !author || !startDate || !endDate) {
                return res.status(400).json({
                    message: 'All fields are required: title, content, author, startDate, endDate',
                });
            }
        }

        // Insert the news posts into the database
        const insertedPosts = await NewsPost.insertMany(newsPosts);
        res.status(201).json(insertedPosts);
    } catch (error) {
        res.status(400).json({ message: 'Error adding news posts', error });
    }
});

// 5. Update a news post
router.put('/:id', async (req, res) => {
    try {
        const newsPost = await NewsPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!newsPost) return res.status(404).json({ message: 'News post not found' });
        res.status(200).json(newsPost);
    } catch (error) {
        res.status(400).json({ message: 'Error updating news post', error });
    }
});

// 6. Delete a news post
router.delete('/:id', async (req, res) => {
    try {
        const newsPost = await NewsPost.findByIdAndDelete(req.params.id);
        if (!newsPost) return res.status(404).json({ message: 'News post not found' });
        res.status(200).json({ message: 'News post deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting news post', error });
    }
});

module.exports = router;
