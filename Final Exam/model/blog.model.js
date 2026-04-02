const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  image: {
    type: String
  },

  category: {
    type: String,
    default: "general"
  },

  tags: {
    type: [String],   // multiple tags
    default: []
  },

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published"
  },

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }

});

module.exports = mongoose.model("Blog", blogSchema);