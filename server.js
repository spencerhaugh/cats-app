//===================
//Dependencies
//===================
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
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
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true}, { useUnifiedTopology: true }, { useFindAndModify: false });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected!'));

// open the connection to mongo
db.on('open' , ()=>{});

//===================
//Middleware
//===================

//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//===================
// Routes
//===================
//localhost:3000
app.get('/catabase' , (req, res) => {
  res.render('index.ejs');
});

//new
app.get('/catabase/new', (req, res) => {
    // res.send('This will create a new item, eventually.');
    res.render('new.ejs');
});

// test model route
app.get('/testpage', async (req, res) => {
    const newTestCat = new Catabase({ name: 'Smokey'});
    await newTestCat.save();
    res.send(newTestCat);
})

//show
app.get('/catabase/:id', (req, res) => {
    res.send('This will be the show page');
});

//update(edit)
app.get('/catabase/:id/edit', (req, res) => {
    res.send('This is where the edit form will be');
});

app.post('/catabase/:id/edit', (req, res) => {

})



//===================
//Listener
//===================
app.listen(PORT, () => console.log( 'Listening on port:', PORT));