const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 // const authHeader = req.get('Authorization');

 // if (!authHeader) {
 //  const error = new Error('Not authenticated.');
 //  error.statusCode = 401;
 //  throw error;
 // }
 // let token;
 // if (
 //  req.headers.authorization &&
 //  req.headers.authorization.startsWith('Bearer')) 
 //  {
 //  token = req.headers.authorization.split(' ')[1];
 //  console.log('token from is-auth: ' + token)
 //  let decodedToken;
 //  try {
 //   decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

 //  } catch (err) {
 //   err.statusCode = 500;
 //   throw err;
 //  }
 //  if (!decodedToken) {
 //   const error = new Error('Not authenticated.');
 //   error.statusCode = 401;
 //   throw error;
 //  }
 //  req.userId = decodedToken.userId;
 //  next();
 // } else {
 //  console.log('some error with token receipt');
 // }
 // // const token = authHeader.split(' ')[1];

 const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
       console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};