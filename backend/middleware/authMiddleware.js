const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");
const User = require("../models/adminModel")
const Student = require("../models/studentModel")

const protect = asyncHandler(async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            let user;
            // Check the URL to determine which model to use
            if (req.originalUrl.includes("/api/admin")) {
                user = await User.findById(decoded.id).select("-password");
            } else if (req.originalUrl.includes("/api/student")) {
                user = await Student.findById(decoded.id).select("-password");
            }

            if (!user) {
                throw new Error("User not found");
            }

            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not Authorized, no token")
    }
})

module.exports = { protect }