const mongoose = require("mongoose");

const extraCategorySchema = mongoose.Schema({

    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    subcategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    },

    extraCategory:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("ExtraCategory", extraCategorySchema)