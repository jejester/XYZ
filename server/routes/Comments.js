const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const comments = await Comments.findAll({ where: { postId: id } })
    res.json(comments);
})

router.post('/', validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router;