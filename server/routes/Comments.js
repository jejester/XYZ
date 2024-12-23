const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const comments = await Comments.findAll({ where: { postId: id } })
    res.json(comments);
})

router.post('/', async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router;