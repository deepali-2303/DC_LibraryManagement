const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("DeliveryPerson", deliverySchema);