const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
// const User = require("../models/userModel");
const Admin = require("../models/adminModel")
const { errorHandler } = require("../middleware/errorMiddleware");


// @desc Register new User
// @route POST /api/users
// @access Public
const registerStudent = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const admin = await Admin.findById("661b9e1957fdc0be1d924487");
    console.log(admin);
    if (!admin) {
        res.status(404)
        throw new Error("Admin not found");
    }

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const studentExists = await Student.findOne({ email });
    if (studentExists) {
        res.status(400)
        throw new Error("Admin already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const student = await Student.create({
        name: name,
        email: email,
        password: hashedPassword,
        admin: admin
    })

    if (student) {
 
        admin.students.push(student._id);
        await admin.save();

        res.status(201).json({
            _id: student._id,
            admin: admin.name,
            name: student.name,
            email: student.email,
            token: generateToken(student._id) // Assuming generateToken() generates a token
        });
    } else {
        res.status(400)
        throw new Error("Invalid data");
    }
})

// @desc Authenticate a User
// @route POST /api/users
// @access Public
const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(email);
    const student = await Student.findOne({ email })
    // console.log(student);
    if (student && (await bcrypt.compare(password, student.password))) {
        res.json({
            id: student.id,
            name: student.name,
            email: student.email,
            admin: student.admin.name,
            token: generateToken(student._id)
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
    const { _id, name, email, books } = await Student.findById(req.user.id)
    const port = req.port;

  // Log the port number
  console.log('Server is running on port:', port);
    res.status(200).json({
        id: _id,
        name,
        email,
        books
    })
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = {
    registerStudent,
    loginStudent,
    getMe,
}