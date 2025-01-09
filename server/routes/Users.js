const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middleware/AuthMiddleware');
require('dotenv').config();

// Route to create a user
router.post('/create', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({username: username, password: hash}).then((user) => {
            res.json("User created successfully!");
        }).catch((error) => {
            res.json(error);
        })
    })
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await  Users.findOne({ where: {username: username} });
    
    if(!user) return res.json({error: "User not found!"});

    bcrypt.compare(password, user.password).then((result) => {
        if(!result) return res.json({error: "Invalid username or password!"});

        const accessToken = sign({username: user.username, id: user.id}, process.env.ACCESS_TOKEN);
        return res.json({token: accessToken, username: user.username, id: user.id});
    })
});

router.get('/validate', validateToken, (req, res) => {
    res.json(req.user);
});

router.get('/user/:id', validateToken, async (req, res) => {
    const userId = req.params.id;
    const user = await Users.findByPk(userId, {attributes: {exclude: ['password']}});
    if(!user){
        res.json({error: 'User not found!'});
    }
    else{
        res.json(user);
    }
});

router.post('/update/password', validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: {username: req.user.username} }); 
    bcrypt.compare(oldPassword, user.password).then(async (result) => {
        if(!result){
            res.json({error: 'Invalid password!'});
        }
        else{
            bcrypt.hash(newPassword, 10).then((hash) => {
                Users.update({password: hash}, { where: {username: req.user.username} });
            });
            res.json({message: 'Password updated successfully!'});
        }
    });
});

module.exports = router;