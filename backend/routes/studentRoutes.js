const express = require("express");
const router = express.Router();
const {registerStudent, loginStudent, getMe, logoutStudent} = require("../controllers/studentController");
const {getBooks, borrowBook, returnBook} = require("../controllers/bookController");
const { protect } = require("../middleware/authMiddleware");

router.post(("/"), registerStudent)
router.post(("/login"), loginStudent)
router.post(('/logout'), protect, logoutStudent)
router.get(("/me"), protect, getMe)
router.get(("/listBooks"), protect, getBooks)
router.post(("/borrowBook"), protect, borrowBook)
router.post(("/returnBook"), protect, returnBook)


module.exports = router;
