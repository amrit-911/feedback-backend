const express = require("express");
const { default: mongoose } = require("mongoose");
const Product = require("../models/product.model")
var router = express.Router();
const dotenv = require("dotenv")
dotenv.config()
const checkToken = require("../middleware/auth")


router.get("/products", async(req, res) => {
    try {
        const productList = await Product.find({})
        res.status(200).json(productList)
    } catch (err) {
        res.status(500).json(`Error occured : ${err}`)
    }
})


router.post("/products/new", async(req, res) => {
    const {
        comapnyName,
        category,
        logoUrl,
        productLink,
        description,
        comments,
        commentNumber,
        upvote
    } = req.body

    try {
        await Product.create({
            comapnyName,
            category,
            logoUrl,
            productLink,
            description,
            comments,
            commentNumber,
            upvote
        })
        res.status(200).json({ success: "Product Created" })
    } catch (err) {
        res.status(500).json(`Error occured ${err} `)
    }
})

router.get("/products/:sort", async(req, res) => {

    try {
        const cat = {}
        if (req.query.category) {
            cat.category = req.query.category
        }
        if (req.params.sort === "Upvotes") { //upvote sort
            const product = await Product.find(cat).sort({ upvote: -1 })
            const filter = await Product.distinct("category")
            res.status(200).json({
                success: true,
                product,
                filter
            })

        } else if (req.params.sort === "Comments") { //comment sort
            const product = await Product.find(cat).sort({ commentNumber: -1 })
            const filter = await Product.distinct("category")

            res.status(200).json({
                success: true,
                product,
                filter
            })
        }

    } catch (err) {
        res.status(500).json(`Error occured : ${err}`)
    }
})

router.get("/products/suggestions", async(req, res) => {
    try {
        const productList = await Product.find().count()
        res.status(200).json(productList)
    } catch (err) {
        res.status(500).json(`Error occured : ${err}`)
    }
})

router.post("/products/:id/upvote", async(req, res) => {

    try {
        const updateVote = await Product.findOneAndUpdate({ _id: req.params.id }, { upvote: req.body.upvote })
        res.status(200).json(updateVote)

    } catch (err) {
        res.status(500).json(`Error occured : ${err}`)
    }
})
router.post("/products/:id/comment-number", async(req, res) => {
    try {
        const updateVote = await Product.findOneAndUpdate({ _id: req.params.id }, { commentNumber: req.body.commentNumber })
        res.status(200).json(updateVote)

    } catch (err) {
        res.status(500).json(`Error occured : ${err}`)
    }
})
router.post("/products/:id/addcomment", async(req, res) => {
    try {
        const addComment = await Product.findOneAndUpdate({ _id: req.params.id }, { comments: req.body.comments })
        res.status(200).json(addComment)
    } catch (err) {
        res.status(500).json(`Error occured : ${err}`)
    }
})

router.get("/products/edit/:id", async(req, res) => {
    try {
        const getEdit = await Product.findById(req.params.id)
        res.status(200).json(getEdit)
    } catch (err) {
        res.status(500).json(`Error occured : ${err}`)
    }
})
router.post("/products/edit/:id", async(req, res) => {

    try {
        const {
            comapnyName,
            category,
            logoUrl,
            productLink,
            description,
        } = req.body
        const getEdit = await Product.findOneAndUpdate({ _id: req.params.id }, { comapnyName: comapnyName, category: category, logoUrl: logoUrl, productLink: productLink, description: description })
        res.status(200).json(getEdit)
    } catch (err) {
        res.status(500).json(`Error occured : ${err}`)
    }
})



module.exports = router