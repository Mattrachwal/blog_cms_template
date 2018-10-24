const Mongoose = require('mongoose');

const User = Mongoose.model('User', {
    email: { type: String, index: {unique: true, dropDups: true} },
    password: String,
    name: String,
    created: Date,
    updated: { type: Date, default: Date.now }
});

module.exports = {User: User};