const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getMe, registerDeliveryPerson} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post(("/"), registerUser)
router.post(("/login"), loginUser)
router.get(("/me"), protect, getMe)
router.post(("/registerDelivery"), protect, registerDeliveryPerson)

module.exports = router;
