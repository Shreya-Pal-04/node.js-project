const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String },
    rating: { type: Number},
    votes: { type: String},
    duration: String,
    certification: String,
    releaseDate: Date,
    plot: String,
    image: { type: String, default: "" },
});

module.exports = mongoose.model("Movie", movieSchema);
