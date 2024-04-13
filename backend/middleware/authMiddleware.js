const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const DeliveryPerson = require("../models/deliveryPersonModel")

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            let user;
            // Check the URL to determine which model to use
            if (req.originalUrl.includes("/api/mainUser")) {
                user = await User.findById(decoded.id).select("-password");
            } else if (req.originalUrl.includes("/api/deliveryPerson")) {
                user = await DeliveryPerson.findById(decoded.id).select("-password");
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