const {
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const tokenList = {}


exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).json({
                message: 'Users fetched successfully.',
                users: users,
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

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
            res.status(201).json({
                message: 'User created!',
                userId: result._id
            });
        })
        .catch(err => {
            console.log(err);
            console.log(err.response.data.msg);
            console.log(err.data.msg);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1m'
            });
            const refreshToken = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, process.env.JWT_REFRESH_KEY, {
                expiresIn: '2m'
            });
            const response = {
                user: {
                    userId: loadedUser._id,
                    username: loadedUser.username,
                    email: loadedUser.email,
                    role: loadedUser.role,
                },
                accessToken: token,
                refreshToken: refreshToken
            }
            tokenList[refreshToken] = response
            res.status(200).json(response);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.refreshToken = (req, res, next) => {
    // refresh the damn token
    const postData = req.body
        // if refresh token exists
    if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "name": postData.name
        }
        const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: process.env.tokenLife })
        const response = {
                "accessToken": accessToken,
            }
            // update the token in the list
        tokenList[postData.refreshToken].accessToken = accessToken
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
}