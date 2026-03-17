const ExtraCategory = require('../model/extracategory.model');
const Category = require('../model/category.model');
const Subcategory = require('../model/subcategory.model');

exports.subcategory = async (req,res)=>{
    try{
        let subcategories = await Subcategory.find({categoryId:req.query.categoryId});
        return res.json(subcategories);
    }
    catch(err){
        console.log(err);
        return res.json({message: 'Server Error'});
    }
}
exports.addExtraCategoryPage = async (req,res)=>{
    try{
       const categories = await Category.find();
        res.render("extracategory/add_extracategory",{
            categories
        });
    }
    catch(err){
        console.log("Error:",err);
        res.redirect("/dashboard");
    }
}
exports.addExtraCategory = async (req,res)=>{
    try{
        await ExtraCategory.create(req.body);
        return res.redirect("/extracategory/view_extracategory");
    }catch(error){
        console.log(error);
    }
}
exports.viewExtraCategoryPage = async (req,res)=>{
    try{
        const extracategories = await ExtraCategory.find()
        .populate("categoryId")
        .populate("subcategoryId");

        return res.render("extracategory/view_extracategory",{
            extracategories
        });
    }catch(error){
        console.log(error);
    }
}
exports.deleteExtraCategory = async (req,res)=>{
    try{
       await ExtraCategory.findByIdAndDelete(req.params.id);
        return res.redirect("/extracategory/view_extracategory");
    }catch(error){
        console.log(error);
    }
}

exports.editExtraCategoryPage = async (req,res)=>{
    try{
        let extracategory = await ExtraCategory.findById(req.params.id);
        let categories = await Category.find();
        let subcategories = await Subcategory.find({
            categoryId: extracategory.categoryId
        });
        return res.render("extracategory/edit_extracategory",{
            extracategory,
            categories,
            subcategories
        });
    }
    catch(err){
        console.log(err);
        return res.redirect("/extracategory/view_extracategory");
    }
}

exports.updateExtraCategory = async (req,res)=>{
    try{
        const {categoryId,subcategoryId,extraCategory} = req.body;
        await ExtraCategory.findByIdAndUpdate(req.params.id,{
            categoryId,
            subcategoryId,
            extraCategory
        });
        return res.redirect("/extracategory/view_extracategory");
    }
    catch(err){
        console.log(err);
        return res.redirect("/dashboard");
    }
}