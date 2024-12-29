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
    const result = await Comments.create(comment);
    res.json(result);
})

router.delete('/:commentId', validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({
        where: {
            id: commentId
        }
    })

    if (!commentId) {
        res.json({ error: "Comment not found!" });
    } 
    else{
        res.json("Comment deleted successfully!");
    }
        

})

module.exports = router;