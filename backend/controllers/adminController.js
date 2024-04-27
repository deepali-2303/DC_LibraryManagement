const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel")
const Student = require("../models/studentModel")
// const { errorHandler } = require("../middleware/errorMiddleware");


// @desc Register new User
// @route POST /api/users
// @access Public
const registerAdmin = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
        res.status(400)
        throw new Error("Admin already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const admin = await Admin.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    if (admin) {
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc Authenticate a User
// @route POST /api/users
// @access Public
const loginAdmin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email })

    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }

})


const logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("token");
  
    res.status(200).json({ message: "Logout successful" });
  });

// @desc Get User data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email, students } = await Admin.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        students
    })
})

// @desc Register 
// @route GET /api/users/register
// @access Private
const registerStudent = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const admin = await Admin.findById(req.user.id);

    if (!admin) {
        res.status(404)
        throw new Error("Admin not found");
    }

    const studentExists = await Student.findOne({ email });

    if (studentExists) {
        res.status(400)
        throw new Error("Student already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.create({
        admin: admin._id, // Assign the registered user 
        name: name,
        email: email,
        password: hashedPassword
    });

    if (student) {
     
        admin.students.push(student._id);
        await admin.save();

        res.status(201).json({
            _id: student._id,
            admin: student.admin.name,
            name: student.name,
            email: student.email,
            token: generateToken(student._id) // Assuming generateToken() generates a token 
        });
    } else {
        res.status(400)
        throw new Error("Invalid Student data");
    }
});


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}


module.exports = {
    registerAdmin,
    loginAdmin,
    getMe,
    registerStudent,
    logoutAdmin
}