const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler");
const DeliveryPerson = require("../models/deliveryPersonModel");
// const User = require("../models/userModel");
const { errorHandler } = require("../middleware/errorMiddleware");

// @desc Authenticate a User
// @route POST /api/users
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const deliveryPerson = await DeliveryPerson.findOne({ email })

    if (deliveryPerson && (await bcrypt.compare(password, deliveryPerson.password))) {
        res.json({
            id: deliveryPerson.id,
            name: deliveryPerson.name,
            email: deliveryPerson.email,
            owner: deliveryPerson.owner.name,
            token: generateToken(deliveryPerson._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }

})


// @desc Get User data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const{_id, name, email, owner} = await DeliveryPerson.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        owner
    })
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = {
    loginUser,
    getMe,
}