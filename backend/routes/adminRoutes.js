const express = require("express");
const router = express.Router();
const {registerAdmin, loginAdmin, getMe, registerStudent} = require("../controllers/adminController");
const {addBook} = require("../controllers/bookController");
const { protect } = require("../middleware/authMiddleware");


router.post(("/"), registerAdmin)
router.post(("/login"), loginAdmin)
router.get(("/me"), protect, getMe)
router.post(("/registerStudent"), protect, registerStudent)
router.post(("/addBook"), protect, addBook)

module.exports = router;
