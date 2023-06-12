require("./models/db")
const userController = require("./controllers/userController")
const productController = require("./controllers/productController")
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")

const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const cors = require("cors")
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log("Server started on port 8000...")
})


app.use(("/api/"), userController, productController)


//404 error handling
app.use((req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})