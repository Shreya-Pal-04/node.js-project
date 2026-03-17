const Product = require('../model/product.model');
const Category = require('../model/category.model');
const Subcategory = require('../model/subcategory.model');
const ExtraCategory = require('../model/extracategory.model');

exports.subcategory = async (req,res)=>{
    try{
        let subcategories = await Subcategory.find({categoryId:req.query.categoryId});
        return res.json(subcategories);
    }
    catch(err){
        console.log(err);
        return res.json({message:'Server Error'});
    }
}
exports.extracategory = async (req,res)=>{
    try{
        let extracategories = await ExtraCategory.find({subcategoryId:req.query.subcategoryId});
        return res.json(extracategories);
    }
    catch(err){
        console.log(err);
        return res.json({message:'Server Error'});
    }
}
exports.addProductPage = async (req,res)=>{
    try{
        const categories = await Category.find();
        res.render("product/add_product",{
            categories
        });
    }
    catch(err){
        console.log("Error:",err);
        res.redirect("/dashboard");
    }
}
exports.addProduct = async (req,res)=>{
    try{
        await Product.create(req.body);
        return res.redirect("/product/view_product");
    }
    catch(error){
        console.log(error);
    }
}
// VIEW
exports.viewProductPage = async (req,res)=>{
    try{

        const products = await Product.find()
        .populate("categoryId")
        .populate("subcategoryId")
        .populate("extraCategoryId");

        return res.render("product/view_product",{
            products
        });
    }
    catch(error){
        console.log(error);
    }
}
// DELETE 
exports.deleteProduct = async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        return res.redirect("/product/view_product");
    }
    catch(error){
        console.log(error);
    }
}
// EDIT 
exports.editProductPage = async (req,res)=>{
    try{

        let product = await Product.findById(req.params.id);
        let categories = await Category.find();
        
        let subcategories = await Subcategory.find({
        categoryId: product.categoryId
        });

        let extracategories = await ExtraCategory.find({
            subcategoryId: product.subcategoryId
        });

        return res.render("product/edit_product",{
            product,
            categories,
            subcategories,
            extracategories
        });

    }
    catch(err){
        console.log(err);
        return res.redirect("/product/view_product");
    }
}
// UPDATE
exports.updateProduct = async (req,res)=>{
    try{

        const {categoryId,subcategoryId,extraCategoryId,productName,price,quantity} = req.body;

        await Product.findByIdAndUpdate(req.params.id,{
            categoryId,
            subcategoryId,
            extraCategoryId,
            productName,
            price,
            quantity
        });
        return res.redirect("/product/view_product");
    }
    catch(err){
        console.log(err);
        return res.redirect("/dashboard");
    }
}