//===================
//Dependencies
//===================
const express = require('express');
const session = require('express-session');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');

require('dotenv').config();
const app = express ();
const db = mongoose.connection;
const Catabase = require('./models/catabase.js');
//===================
//Port
//===================
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//===================
//Database
//===================
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `catabase`;

// Connect to Mongo
mongoose.connect(MONGODB_URI,  { useNewUrlParser: true}, { useUnifiedTopology: true }, { useFindAndModify: false });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected!'));

// open the connection to mongo
db.on('open' , ()=>{});

//===================
//Middleware
//===================

//Use express-session:
app.use(
    session({
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
    })
  );
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//===================
// Controllers
//===================

//Users
const userController = require('./controllers/users_controller.js');
app.use('/users', userController);

//Sessions
const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

//===================
// Routes
//===================


//new
app.get('/catabase/new', (req, res) => {
    // res.send('This will create a new item, eventually.');
    res.render('new.ejs', 
    {currentUser: req.session.currentUser}
    );
});


//update/edit link (to edit page)
app.get('/catabase/:id/edit', (req, res) => {
    // res.send('This is where the edit form will be');
    Catabase.findById(req.params.id, (err, foundCat) => {
        res.render('edit.ejs', {
            cat: foundCat,
            currentUser: req.session.currentUser
        })
    })
});
//update/edit form (put route)
app.put('/catabase/:id', (req, res) => {
    Catabase.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}, 
        (err, updatedCat) => {
            res.redirect('/catabase')
        })
})

//Create (new post route)
app.post('/catabase', (req, res) => {
    console.log('clicked post')
    Catabase.create(req.body, (err, createCat) => {
        res.redirect('/catabase')
        console.log('posted post')
        console.log(req.body)
    })
})

//delete
app.delete('/catabase/:id', async (req, res) => {
    console.log('Delete attempt')
    await Catabase.findByIdAndRemove(req.params.id, (err, deletedCat) => {
        console.log('Delete success')
        res.redirect('/catabase')
    })
})

//show
app.get('/catabase/:id', async (req, res) => {
    // res.send('This will be the show page');
    Catabase.findById(req.params.id, (err, foundCat) => {
        res.render('show.ejs', {
            cat: foundCat,
            currentUser: req.session.currentUser
        })
    })
});

//index
app.get('/catabase' , (req, res) => {
    Catabase.find({}, (err, allCats) => {
        res.render('index.ejs', { 
            catabase: allCats,
            currentUser: req.session.currentUser 
        });
    }
)}
);

//===================
//Listener
//===================
app.listen(PORT, () => console.log( 'Listening on port:', PORT));