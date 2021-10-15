const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    // const token = req.body.token || req.query.token || req.headers["x-access-token"] || ;
    const token = req.headers["x-access-token"] || req.headers["authorization"];;
    console.log(token);

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

// const authenticateJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (authHeader) {
//         const token = authHeader.split(' ')[1];

//         jwt.verify(token, accessTokenSecret, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }

//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };