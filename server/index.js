const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/auth', authRoutes);

// middleware for error handling, called after next();
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const port = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECT_STRING)
    .then(result => {
        app.listen(port, console.log(`Server is listening on PORT ${port}`));
    })
    .catch(err => console.log(err));