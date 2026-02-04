const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    category: String,
    image: {
        type: String,
        default: ""
    },
});

module.exports = mongoose.model('Book', bookSchema);
