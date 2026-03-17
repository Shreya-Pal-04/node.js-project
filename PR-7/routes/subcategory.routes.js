const express = require("express");
const routes = express.Router();
const uploadImage = require('../middleware/uploadImage');
const {addSubCategoryPage,addSubCategory,viewSubCategoryPage,editSubCategoryPage,updateSubCategory,deleteSubCategory} = require("../controllers/subcategory.controller");

routes.get("/add_subcategory", addSubCategoryPage);
routes.post("/add_subcategory", uploadImage.single("categoryImage"), addSubCategory);
routes.get("/view_subcategory", viewSubCategoryPage);
routes.get("/edit_subcategory/:id", editSubCategoryPage);
routes.post("/update_subcategory/:id", uploadImage.single("categoryImage"), updateSubCategory);
routes.get("/delete_subcategory/:id", deleteSubCategory);

module.exports = routes;