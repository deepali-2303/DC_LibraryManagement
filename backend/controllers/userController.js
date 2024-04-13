const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const DeliveryPerson = require("../models/deliveryPersonModel")
// const { errorHandler } = require("../middleware/errorMiddleware");


// @desc Register new User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc Authenticate a User
// @route POST /api/users
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
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
    const{_id, name, email, deliveryPersons} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        deliveryPersons
    })
})

// @desc Register Delivery Person
// @route GET /api/users/registerDelivery
// @access Private
const registerDeliveryPerson = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404)
        throw new Error("User not found");
    }

    const deliveryPersonExists = await DeliveryPerson.findOne({ email });

    if (deliveryPersonExists) {
        res.status(400)
        throw new Error("Delivery person already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const deliveryPerson = await DeliveryPerson.create({
        owner: user._id, // Assign the registered user as the owner of the delivery person
        name: name,
        email: email,
        password: hashedPassword
    });

    if (deliveryPerson) {
        // Push the newly created delivery person's ID to the user's deliveryPersons array
        user.deliveryPersons.push(deliveryPerson._id);
        await user.save();

        res.status(201).json({
            _id: deliveryPerson._id,
            owner: deliveryPerson.owner.name,
            name: deliveryPerson.name,
            email: deliveryPerson.email,
            token: generateToken(deliveryPerson._id) // Assuming generateToken() generates a token for the delivery person
        });
    } else {
        res.status(400)
        throw new Error("Invalid delivery person data");
    }
});


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    registerDeliveryPerson
}