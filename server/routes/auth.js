const express = require('express');
// const { body } = require('express-validator');

const authController = require('../controllers/auth');
const validator = require('../middleware/validator');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/signup', validator.signupUser, authController.signup);

router.post('/login', validator.loginUser, authController.login);

router.get('/users', isAuth, authController.getUsers);
// router.get('/users', authController.getUsers);

router.post('/refreshtoken', authController.refreshToken);

// router.delete('/logout', isAuth, authController.logout);

module.exports = router;