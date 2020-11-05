const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catabaseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    stars: {
        type: Number,
        default: 3
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

const Catabase = mongoose.model('Catabase', catabaseSchema);

module.exports = Catabase