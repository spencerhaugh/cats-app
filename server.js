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

//Cats
const catsController = require('./controllers/cats_controller.js');
app.use('/catabase', catsController);

//Users
const userController = require('./controllers/users_controller.js');
app.use('/users', userController);

//Sessions
const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

//===================
// Routes
//===================




//===================
//Listener
//===================
// Set to PORT for Heroku, and 3000 for local testing
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
console.log(process.env.PORT)