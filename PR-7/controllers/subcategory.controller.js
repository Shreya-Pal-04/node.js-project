const Subcategory = require('../model/subcategory.model');
const Category = require('../model/category.model');
const fs = require("fs");

exports.addSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render("subcategory/add_subcategory", { categories });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addSubCategory = async (req, res) => {
    try {
        let subcategory = await Subcategory.create(req.body);
        return res.redirect("/subcategory/view_subcategory");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.viewSubCategoryPage = async (req, res) => {
    try {
        const subcategories  = await Subcategory.find().populate("categoryId");
        return res.render("subcategory/view_subcategory", { subcategories });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}
exports.editSubCategoryPage = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);
        const categories = await Category.find();
        return res.render("subcategory/edit_subcategory", {
            subcategory,
            categories
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/subcategory/view_subcategory");
    }
}
exports.updateSubCategory = async (req, res) => {
    try {
        await Subcategory.findByIdAndUpdate(req.params.id, {
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategory
        });
        return res.redirect("/subcategory/view_subcategory");
    } catch (error) {
        console.log(error);
    }
}
exports.deleteSubCategory = async (req, res) => {
    try {
        await Subcategory.findByIdAndDelete(req.params.id);
        return res.redirect("/subcategory/view_subcategory");
    } catch (error) {
        console.log(error);
    }
}