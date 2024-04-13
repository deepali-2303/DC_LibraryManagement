const express = require("express");
const router = express.Router();
const {registerStudent, loginStudent, getMe} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

router.post(("/"), registerStudent)
router.post(("/login"), loginStudent)
router.get(("/me"), protect, getMe)

module.exports = router;
