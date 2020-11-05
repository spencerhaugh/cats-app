const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    likedCats: {
        type: [mongoose.ObjectID] 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;