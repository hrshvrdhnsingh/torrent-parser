const mongoose = require("mongoose")
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connection to database succesful.")
    })
    .catch((err) => {
        console.log('Unsuccesful attempt.')
        console.log(err.message)
    })
}

module.exports = dbConnect;