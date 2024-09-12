const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).send("Нет токена!");

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.authId = decoded?.userId;
        next();
    } catch (error) {
        res.status(403).send("Yaroqsiz token!");
    }
}

module.exports = authentication;