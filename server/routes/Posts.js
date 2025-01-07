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
router.post('/create', validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json({"response": "Post created!"});
})

//Route to fetch a single post by its id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

// Route to get all the post of a certain use
router.get('/byUser/:id', validateToken, async (req, res) => {
    const id = req.params.id;
    const posts = await Posts.findAll({ where: { UserId: id }, include: [Likes] });
    res.json(posts);
});

//Route to delete a post
router.delete('/:id', validateToken, async (req, res) => {
    const id = req.params.id;
    await Posts.destroy({
        where: {
            id: id
        }
    })
    res.json({"response": "Post deleted!"});
})

module.exports = router;