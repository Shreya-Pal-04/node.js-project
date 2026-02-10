const express = require("express");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/movie.route"); 
const dbConnect = require("./config/dbConnect"); 
dbConnect();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use("/", movieRoutes);

app.listen(8000, () => console.log("Server running at http://localhost:8000"));
