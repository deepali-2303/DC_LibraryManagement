const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Admin"
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
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Student", studentSchema);