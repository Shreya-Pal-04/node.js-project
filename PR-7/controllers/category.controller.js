const Category = require('../model/category.model');
const fs = require("fs");

exports.addCategoryPage = async (req, res) => {
    try {
        return res.render("category/add_category");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addCategory = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        await Category.create({
            ...req.body,
            categoryImage: imagePath
        });

        return res.redirect("/category/view_category");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewCategoryPage = async (req, res) => {
    try {
        let categories = await Category.find()
        return res.render("category/view_category", { categories });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editCategoryPage = async (req,res)=>{
    try{

        let category = await Category.findById(req.params.id);

        return res.render("category/edit_category", {category});

    }catch(error){
        console.log(error);
        return res.redirect("/category/view_category");
    }
}

exports.updateCategory = async (req, res) => {
    try {

        let category = await Category.findById(req.params.id);

        let imagePath = category.categoryImage;

        if (req.file) {

            imagePath = "/uploads/" + req.file.filename;

            if (category.categoryImage && fs.existsSync("public" + category.categoryImage)) {
                fs.unlinkSync("public" + category.categoryImage);
            }
        }

        await Category.findByIdAndUpdate(req.params.id, {
            category: req.body.category,
            categoryImage: imagePath
        });

        return res.redirect("/category/view_category");

    } catch (error) {
        console.log(error);
    }
}

exports.deleteCategory = async (req,res)=>{
    try{

        let category = await Category.findById(req.params.id);

        if(category.categoryImage && fs.existsSync("public" + category.categoryImage)){
            fs.unlinkSync("public" + category.categoryImage);
        }

        await Category.findByIdAndDelete(req.params.id);

        return res.redirect("/category/view_category");

    }catch(error){
        console.log(error);
    }
}