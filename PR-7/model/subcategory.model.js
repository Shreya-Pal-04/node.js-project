const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: String,
});

module.exports = mongoose.model('Subcategory', subcategorySchema);