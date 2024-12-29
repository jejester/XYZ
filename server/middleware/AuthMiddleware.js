const { verify } = require('jsonwebtoken');
require('dotenv').config()

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({error: "User not logged in!"});

    try{
        const validToken = verify(accessToken, process.env.ACCESS_TOKEN);
        req.user = validToken;
        if (validToken){
            return next();
        }
    }
    catch(err){
        res.json({error: err})
    }
};

module.exports = { validateToken };