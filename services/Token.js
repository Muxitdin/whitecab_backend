const jwt = require('jsonwebtoken');

module.exports = function (userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
    return token
}