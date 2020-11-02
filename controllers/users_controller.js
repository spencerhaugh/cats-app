const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('./models/users.js');

//ROUTES

//New user sign up
users.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

//Create new user (post route from New User)
users.post('./', (req, res) => {
    // have bcrypt hash the password and overwrite user entry to pass into db
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        console.log('user is created: ', createdUser);
        res.redirect('/catabase');
    })
})