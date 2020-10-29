const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catabaseSchema = new Schema({
    name: String,
    description: String,
    img: String,
});

const Catabase = mongoose.model('Catabase', catabaseSchema);

module.exports = Catabase