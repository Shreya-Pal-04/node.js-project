const Blog = require("../model/blog.model");

exports.createblog = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      tags: typeof req.body.tags === "string"
  ? req.body.tags.split(",")
  : req.body.tags,
      status: req.body.status,
      image: req.file ? req.file.filename : "",
      admin: req.admin.id
    });
    await blog.save();

    res.json({
      success: true,
      msg: "Blog created",
      data: blog
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error creating blog",
      error: err.message
    });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getblogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      msg: "All blogs fetched",
      total: blogs.length,
      data: blogs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error fetching blogs",
      error: err.message
    });
  }
};

exports.updateblog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updatedData = {
      ...req.body,
      ...(req.file && { image: req.file.filename })
    };
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json({
      success: true,
      msg: "Blog updated",
      data: updatedBlog
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteblog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        msg: "Blog not found"
      });
    }
    await blog.deleteOne();

    res.json({
      success: true,
      msg: "Blog deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error deleting blog",
      error: err.message
    });
  }
};
