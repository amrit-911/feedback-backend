const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const dbUrl = process.env.MONGO_URL
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("conected to database")
    }).catch((err) => console.log("error: ", err))