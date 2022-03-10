const mongoose = require('mongoose');  //this mongoose library isntanc will the same as the one instantiated in index.js

//defining schema for the database of users
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    referredUser: { type: String },
    isPaymentMade: { type: Boolean, default: false },
    totalEarnings: { type: Number, default: 0 }
});

//defining what we want to call our collection in the database
const User = mongoose.model('User', userSchema);

module.exports = User;