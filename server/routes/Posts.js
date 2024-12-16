const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

// /post route to retrieve list of all post from the database
router.get('/', async (req, res) => {
    const postsList = await Posts.findAll();
    res.json(postsList);
});

// Route to create a post
router.post('/create', async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json({"response": "Post created!"});
})

module.exports = router;