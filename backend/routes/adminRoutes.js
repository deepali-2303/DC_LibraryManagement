const express = require("express");
const router = express.Router();
const {registerAdmin, loginAdmin, getMe, registerStudent, logoutAdmin} = require("../controllers/adminController");
const {addBook, getBooks} = require("../controllers/bookController");
const {getStudent} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");


router.post(("/"), registerAdmin)
router.post(("/login"), loginAdmin)
router.post(("/logout"), logoutAdmin)
router.get(("/me"), protect, getMe)
router.post(("/registerStudent"), protect, registerStudent)
router.get(("/listStudents"), protect, getStudent)
router.get(("/listBooks"), protect, getBooks)
router.post(("/addBook"), protect, addBook)

module.exports = router;
