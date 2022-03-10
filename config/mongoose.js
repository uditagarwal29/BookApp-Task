const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/booksApp_users'); //establishing connection between database and mongoose

const db = mongoose.connection; //used to access database connection

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;