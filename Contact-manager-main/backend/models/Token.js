const jwt = require('jsonwebtoken');
const config = require('../config/keys');

exports.createToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: '1h',
    });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};
