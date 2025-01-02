const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware');

// /post route to retrieve list of all post from the database
router.get('/', validateToken, async (req, res) => {
    const postsList = await Posts.findAll( { include: [Likes] });
    const likedPosts = await Likes.findAll( { where: { UserId: req.user.id } });
    res.json({postsList: postsList, likedPosts: likedPosts});
});

// Route to create a post
router.post('/create', async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json({"response": "Post created!"});
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

module.exports = router;