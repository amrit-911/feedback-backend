const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/user.model")

var router = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()
const checkToken = require("../middleware/auth")


router.post("/register", async(req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        let name = req.body.name
        let mobile = req.body.mobile

        if (!email || !password || !name || !mobile) {
            res.status(400).json("fields are empty")
        } else {
            const oldUser = await User.findOne({ email })

            if (oldUser) {
                res.status(400).json("Already registered")
            } else {

                let encryptedPassword = await bcrypt.hash(password, 10);

                // Create user in our database
                const user = await User.create({
                    email: email.toLowerCase(), // sanitize: convert email to lowercase
                    password: encryptedPassword,
                    name: name,
                    mobile: mobile
                });
                if (user && bcrypt.compare(password, user.password)) {
                    const token = jwt.sign({ email, password },
                        process.env.SECRET_KEY, {
                            expiresIn: "24h",
                        }
                    );
                    res.status(200).json({ success: "Registered Successfully", email: email, name: name, token: token })
                }

            }
        }
    } catch (err) {
        res.status(500).json(`Error occured ${err} `)
    }
})

router.post("/login", async(req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            res.status(400).json("fields are empty")
        } else {
            const user = await User.findOne({ email })
            if (user && await bcrypt.compare(password, user.password)) {

                const token = jwt.sign({ email, password },
                    process.env.SECRET_KEY, {
                        expiresIn: "24h",
                    }
                );
                res.status(200).json({ email: user.email, name: user.name, token: token })

            } else {
                res.json({ err: "Invalid Details" })
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500).json(`Server Error`)
    }
})
router.post("/user/:email", checkToken, async(req, res) => {
    try {
        const email = req.params.email

        const user = await User.findOne({ email })
        if (user.email) {
            res.status(200).json({ profile: user.name })
        } else {
            res.status(200).json("user not found")
        }
    } catch (err) {
        res.status(500).json(`Error occured ${err} `)
    }
})

module.exports = router