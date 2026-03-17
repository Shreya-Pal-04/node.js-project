const express = require('express');
const router = express.Router();

const {addProductPage,addProduct,viewProductPage,deleteProduct,editProductPage,updateProduct,subcategory,extracategory} = require("../controllers/product.controller");

router.get("/add_product", addProductPage);
router.post("/add_product", addProduct);
router.get("/view_product", viewProductPage);
router.get("/delete_product/:id", deleteProduct);
router.get("/edit_product/:id", editProductPage);
router.post("/update_product/:id", updateProduct);
router.get("/subcategory", subcategory);
router.get("/extracategory", extracategory);

module.exports = router;