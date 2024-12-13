const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/', async (req, res) => {
    const postsList = await Posts.findAll();
    res.json(postsList);
});

router.post('/create', async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json({"respone": "Post created!"});
})

module.exports = router;