const Admin = require("../model/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, gender } = req.body;

    const exist = await Admin.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const admin = new Admin({
      firstName,
      lastName,
      email,
      password: hash,
      phoneNumber,
      gender,
      image: req.file ? req.file.filename : ""
    });
    await admin.save();

    res.json({
      success: true,
      msg: "Admin registered",
      data: admin
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error in register",
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, isDelete: false });
    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }
    const token = jwt.sign(
      { admin: { id: admin._id } },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    res.json({
      success: true,
      msg: "Login successful",
      token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error in login",
      error: err.message
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json({
      success: true,
      data: admin
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error fetching profile",
      error: err.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    admin.firstName = req.body.firstName || admin.firstName;
    admin.lastName = req.body.lastName || admin.lastName;
    admin.phoneNumber = req.body.phoneNumber || admin.phoneNumber;
    admin.gender = req.body.gender || admin.gender;
    if (req.file) {
      admin.image = req.file.filename;
    }
    await admin.save();
    res.json({
      success: true,
      msg: "Profile updated",
      data: admin
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error updating profile",
      error: err.message
    });
  }
};

exports.Adelete = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    admin.isDelete = true;
    await admin.save();

    res.json({
      success: true,
      msg: "Admin deleted (soft delete)"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error deleting admin",
      error: err.message
    });
  }
};