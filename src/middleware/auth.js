const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({message: 'An authentication token was not provided'});
    }

    jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: false
    }, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({message: 'Authentication token has expired'});
            }
            return res.status(403).json({message: 'Invalid authentication token'});
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
