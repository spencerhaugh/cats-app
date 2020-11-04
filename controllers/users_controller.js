const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

//ROUTES

//New user sign up
users.get('/new', (req, res) => {
    // res.send("New User sign up page")
    console.log("got the user signup request!");
    res.render('users/new.ejs'), {
    currentUser: req.session.currentUser
    }
    console.log('executed the user signup request!');
});

//Create new user (post route from New User)
users.post('/', (req, res) => {
    console.log('Create user button clicked!');
    // have bcrypt hash the password and overwrite user entry to pass into db
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log('user is created: ', createdUser);
        res.redirect('/catabase');
    });
});

module.exports = users;