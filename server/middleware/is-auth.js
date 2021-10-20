const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    // const token = req.body.token || req.query.token || req.headers["x-access-token"] || ;
    // const token = req.headers["x-access-token"] || req.headers["authorization"];
    // console.log(token);

    const { authorization } = req.headers;
    const [, token] = Authorization.split(' ');

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log('succeeded')
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = authenticateJWT;