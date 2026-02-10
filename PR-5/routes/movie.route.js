const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const uploadImage = require("../middleware/uploadImage"); 

router.get("/", movieController.getMovies);
router.get("/add", movieController.addMoviePage);
router.post("/add-movie", uploadImage.single("imgURL"), movieController.addMovie);
router.get("/delete/:id", movieController.deleteMovie);
router.get("/edit/:id", movieController.editMoviePage);
router.post("/edit/:id", uploadImage.single("imgURL"), movieController.updateMovie);


module.exports = router;
