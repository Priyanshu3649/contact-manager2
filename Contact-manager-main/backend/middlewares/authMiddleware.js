const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/keys');

module.exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};


exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};
