const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token"); //stores the jwt
        if (!token) return res.status(401).json({msg: "No Authentication Token. Access Denied."});
        
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) return res.status(401).json({msg: "Token verification failed. Access Denied"});

        req.person = verified.id;
        next();

    } catch (err) {
        res.status(500).json({error: err});
    }
}

module.exports = auth;