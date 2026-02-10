const Movie = require("../model/movie.model");
const fs = require('fs');
const path = require('path');

exports.getMovies = async (req, res) => {
    try {
        let search = req.query.search || "";
        let movies;

        if (search) {
            movies = await Movie.find({
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { genre: { $regex: search, $options: "i" } },
                    { language: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ]
            });
        } else {
            movies = await Movie.find();
        }
        res.render("movie", { movies, search });
    } catch (err) {
        console.log(err);
        res.send("Error fetch movies");
    }
};

exports.addMoviePage = (req, res) => {
    res.render("addMovie");
};

exports.addMovie = async (req, res) => {
    const imagePath = req.file ? "/uploads/" + req.file.filename : "";
    try {
        await Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            votes: req.body.votes,
            duration: req.body.duration,
            certification: req.body.certification,
            releaseDate: req.body.releaseDate,        
            plot: req.body.plot,
            image: imagePath 
        });
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Error add movie");
    }
};
// Edit
exports.editMoviePage = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render("editMovie", { movie });
    } catch (err) {
        console.log(err);
        res.send("Error loading edit");
    }
};

// Update
exports.updateMovie = async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            rating: req.body.rating,
            votes: req.body.votes,
            duration: req.body.duration,
            certification: req.body.certification,
            releaseDate: req.body.releaseDate,  
            plot: req.body.plot
        };
        if (req.file) {
            updateData.image = "/uploads/" + req.file.filename;
        }
        await Movie.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Error updating movie");
    }
};
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.send("Movie not found");
        }
        if (movie.image) {
            const imagePath = path.join(__dirname, '..', movie.image); 
            try {
                fs.unlinkSync(imagePath);
            } catch (err) {
                console.log("Image not found");
            }
        }
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
};

