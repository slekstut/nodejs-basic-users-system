const User = require('../models/user');
const { body } = require('express-validator');

exports.signupUser = [
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
    .isLength({ min: 5, max: 40 })
    .withMessage('Name must be at least 5 chars long or not more 40')
    .trim()
    .not()
    .isEmpty()
];

exports.loginUser = [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail({ gmail_remove_dots: false })
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (!userDoc) {
                return Promise.reject('Email address already exists!');
            }
        });
    }),
    body('password')
    .trim()
    .not()
    .isEmpty()
];