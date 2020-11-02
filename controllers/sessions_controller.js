const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

//Log In GET route for Log In button
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {currentUser: req.session.currentUser});
});

//Auth check against user db at Log In form submit
sessions.post('/', (req, res) => {
    //Scenerios:
    //S1: username found, password match
    //Result: Successful log in

    //S2: username not found
    //Result: Unsuccessful login

    //S3: Username found, no password match
    //Result: Unsuccessful login

    //S4: Other (error, timeout, server crash, etc)
    //Result: "System error, please try again"

    User.findOne({username: req.body.username}, (err, foundUser) => {
        //S4:
        if (err) {
            console.log(err)
            res.send('System error, please try again!')
        //S2:
        } else if (!foundUser) {
            res.send('<a href="/catabase">Username not found!</a>')
        //S1 and S3 (username found):
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // if password match, connect user to current session and redirect to index
                req.session.currentUser = foundUser;
                res.redirect('/catabase');
            } else {
                //if not a password match
                res.send('<a href="/catabase">Password does not match :(</a>');
            };
        };
    });
});

//On Log Out button click
sessions.delete('/', (req, res) => {
    req.session.destroy( () => {
        res.redirect('/catabase');
    });
});

module.exports = sessions