const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    comapnyName: {
        type: String,
        required: [true, "Please Enter the details"]
    },
    category: {
        type: Array,
        required: [true, "Please Enter the details"]
    },
    logoUrl: {
        type: String,
        required: [true, "Please Enter the details"]
    },
    productLink: {
        type: String,
        required: [true, "Please Enter the details"]
    },
    description: {
        type: String,
        required: [true, "Please Enter the details"],
        min: [5, "Minimum 5 letters"]
    },
    comments: {
        type: Array,
    },
    commentNumber: {
        type: Number,
    },
    upvote: {
        type: Number,
    }
})

const Product = mongoose.model("products", productSchema)

module.exports = Product