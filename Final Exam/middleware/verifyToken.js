const Admin = require("../model/admin.model");
const jwt = require("jsonwebtoken");

exports.verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No Token"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.admin.id);

    if (!admin || admin.isDelete) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    req.admin = {
      id: admin._id
    };

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
};