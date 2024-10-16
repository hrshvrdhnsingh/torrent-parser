require("dotenv").config();
const cors = require("cors")
const express = require("express")
const app = express()
const dbConnect = require('./database');
const userRoute = require("./routes/userRoute")

app.use(express.json())
app.use(cors());

dbConnect();

app.use("/api/v1/auth", userRoute)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
app.use(cors({
    origin: '*', credentials: true,
}))
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server up and running"
    })
})