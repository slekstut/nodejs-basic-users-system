const {
 validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');


exports.signup = (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  const error = new Error('Validation failed.');
  error.statusCode = 422;
  error.data = errors.array();
  throw error;
 }
 const email = req.body.email;
 const username = req.body.username;
 const password = req.body.password;
 bcrypt.hash(password, 12).then(hashedPsw => {
  const user = new User({
   email: email,
   password: hashedPsw,
   username: username
  });
  return user.save();
 })
 .then(result => {
  res.status(201).json({ message: 'User created!', userId: result._id });
 })
 .catch(err => {
  if (!err.statusCode) {
   err.statusCode = 500;
  }
  next(err);
 });
};