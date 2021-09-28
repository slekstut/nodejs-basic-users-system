const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/signup', [
 body('email')
 .isEmail()
 .withMessage('Please enter a valid email.')
 .custom((value, { req }) => {
  return User.findOne({ email: value }).then(userDoc => {
   if (userDoc) {
    return Promise.reject('Email address already exists!');
   }
  });
 })
 .normalizeEmail({ gmail_remove_dots: false }),
 body('password')
  .trim()
  .not()
  .isEmpty(),
 body('username')
  .trim()
  .not()
  .isEmpty()
],
authController.signup);

router.post('/login', authController.login);

router.get('/all-users', isAuth, authController.getAll);

module.exports = router;