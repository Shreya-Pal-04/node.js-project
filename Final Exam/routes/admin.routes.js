const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {verifyAdminToken} = require("../middleware/verifyToken");

const {register,login,profile,update,Adelete} = require("../controller/admin.controller");
const {createblog,getblogs,updateblog,deleteblog,getSingleBlog} = require("../controller/blog.controller");

// routes
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/profile", verifyAdminToken, profile);
router.put("/update", verifyAdminToken,upload.single("image"), update);
router.delete("/delete", verifyAdminToken, Adelete );

router.post("/add-blog", verifyAdminToken, upload.single("image"), createblog);
router.get("/blog/:id", verifyAdminToken, getSingleBlog);
router.get("/all-blogs", verifyAdminToken,getblogs);
router.put("/update-blog/:id", verifyAdminToken,upload.single("image"), updateblog);
router.delete("/delete-blog/:id", verifyAdminToken, deleteblog);

module.exports = router;