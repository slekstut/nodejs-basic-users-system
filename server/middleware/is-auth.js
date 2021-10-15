// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     // const authHeader = req.get('Authorization');

//     // if (!authHeader) {
//     //  const error = new Error('Not authenticated.');
//     //  error.statusCode = 401;
//     //  throw error;
//     // }
//     // let token;
//     // if (
//     //  req.headers.authorization &&
//     //  req.headers.authorization.startsWith('Bearer')) 
//     //  {
//     //  token = req.headers.authorization.split(' ')[1];
//     //  console.log('token from is-auth: ' + token)
//     //  let decodedToken;
//     //  try {
//     //   decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     //  } catch (err) {
//     //   err.statusCode = 500;
//     //   throw err;
//     //  }
//     //  if (!decodedToken) {
//     //   const error = new Error('Not authenticated.');
//     //   error.statusCode = 401;
//     //   throw error;
//     //  }
//     //  req.userId = decodedToken.userId;
//     //  next();
//     // } else {
//     //  console.log('some error with token receipt');
//     // }
//     // // const token = authHeader.split(' ')[1];

//     let token = req.headers.authorization || req.headers['x-access-token'] || req.body.token;

//     if (token) {
//         console.log('this is token from console.log: ' + token)
//         if (token.startsWith('Bearer ')) {
//             token = token.slice(7, token.length)
//             if (!token || token === '') res.sendStatus(401);
//             console.log('No token provided.')
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//             if (err) {
//                 const error = new Error('Invalid token.');
//                 error.statusCode = 403;
//                 throw error;
//             }

//             res.user = decoded;
//             res.token = token;
//             return next();
//         });
//     } else {
//         res.sendStatus(401);
//         console.log('No token provided.')
//     }
// };

const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization.replace("Bearer ", "");
        const token = localStorage.getItem('token');
        console.log('token from is-auth: ' + token);
        const decoded = jwt.verify(token, "secret");
        req.data = decoded;
        // console.log(req.userData);
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentification Failed"
        });
    }
};