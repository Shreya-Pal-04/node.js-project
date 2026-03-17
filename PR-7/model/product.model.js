const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName:{
        type:String,
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number,
    },
    description:{
        type:String,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    subcategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategory"
    },
    extraCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ExtraCategory"
    }
});

module.exports = mongoose.model("Product",productSchema);