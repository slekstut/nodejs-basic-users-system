const jwt = require("jsonwebtoken");

const authenticateJWT = async(req, res, next) => {

    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = authenticateJWT;