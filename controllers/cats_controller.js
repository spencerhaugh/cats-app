const express = require('express');
const app = express();
const Catabase = require('../models/catabase.js');
const User = require('../models/users.js');
const catabase = express.Router();


// ROUTES

//new
catabase.get('/new', (req, res) => {
    // res.send('This will create a new item, eventually.');
    res.render('new.ejs', 
    {currentUser: req.session.currentUser}
    );
});


//update/edit link (to edit page)
catabase.get('/:id/edit', (req, res) => {
    // res.send('This is where the edit form will be');
    Catabase.findById(req.params.id, (err, foundCat) => {
        res.render('edit.ejs', {
            cat: foundCat,
            currentUser: req.session.currentUser
        })
    })
});
//update/edit form (put route)
catabase.put('/:id', (req, res) => {
    Catabase.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}, 
        (err, updatedCat) => {
            res.redirect('/catabase')
        })
})

//Create (new post route)
catabase.post('/', (req, res) => {
    console.log('clicked post')
    Catabase.create(req.body, (err, createCat) => {
        res.redirect('/catabase')
        console.log('posted post')
        console.log(req.body)
    })
})

//delete
catabase.delete('/:id', async (req, res) => {
    console.log('Delete attempt')
    await Catabase.findByIdAndRemove(req.params.id, (err, deletedCat) => {
        console.log('Delete success')
        res.redirect('/catabase')
    })
})

//show
catabase.get('/:id', async (req, res) => {
    // res.send('This will be the show page');
    Catabase.findById(req.params.id, (err, foundCat) => {
        res.render('show.ejs', {
            cat: foundCat,
            currentUser: req.session.currentUser
        })
    })
});

// ADD LIKES

//add like to cat
catabase.patch('/:id', (req, res) => {
    console.log('Got a like request!');
    console.log(req.session.currentUser._id);
    Catabase.findByIdAndUpdate(req.params.id, {$inc: {likes: +1}, $addToSet: {likedBy: req.session.currentUser._id}}, {new: true}, (err, foundCat) => {
        console.log('Added the like to cat!');
        res.redirect(`${req.params.id}`);
    });
});

//index
catabase.get('/' , (req, res) => {
    Catabase.find({})
        .sort({likes: -1}) 
        .exec((err, allCats) => {
        res.render('index.ejs', { 
            catabase: allCats,
            currentUser: req.session.currentUser 
        });
    }
)}
);

module.exports = catabase;