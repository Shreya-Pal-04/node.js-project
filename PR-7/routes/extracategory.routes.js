const express = require("express");
const routes = express.Router();

const {
  addExtraCategoryPage,
  addExtraCategory,
  viewExtraCategoryPage,
  deleteExtraCategory,
  editExtraCategoryPage,
  updateExtraCategory,
  subcategory,
} = require("../controllers/extracategory.controller");

routes.get("/add_extracategory", addExtraCategoryPage);
routes.post("/add_extracategory", addExtraCategory);
routes.get("/view_extracategory", viewExtraCategoryPage);
routes.get("/delete_extracategory/:id", deleteExtraCategory);
routes.get("/edit_extracategory/:id", editExtraCategoryPage);
routes.post("/update_extracategory/:id", updateExtraCategory);

routes.get("/subcategories", subcategory);

module.exports = routes;
