const express = require("express");
const routes = express.Router();
const uploadImage = require('../middleware/uploadImage');
const {addCategoryPage,addCategory,viewCategoryPage,editCategoryPage,updateCategory,deleteCategory} = require("../controllers/category.controller");

routes.get("/add_category", addCategoryPage);
routes.post("/add_category", uploadImage.single("categoryImage"), addCategory);
routes.get("/view_category", viewCategoryPage);
routes.get("/edit_category/:id", editCategoryPage);
routes.post("/update_category/:id", uploadImage.single("categoryImage"), updateCategory);
routes.get("/delete_category/:id", deleteCategory);

module.exports = routes;