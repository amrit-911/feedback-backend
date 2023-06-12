const { default: mongoose } = require("mongoose");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        min: [8, "At least 8 letters required"]
    },
    mobile: {
        type: Number,
        min: [10, "Invalid Mobile Number"],

    },
})

const User = mongoose.model("FeedUser", userSchema)

module.exports = User