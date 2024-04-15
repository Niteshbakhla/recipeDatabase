const express = require("express");
const app = express()
const PORT = 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./Database/connection");
const router = require("./Routes/routes")
require("dotenv").config()

app.use(express.json());

app.use(cors({
            origin: "http://localhost:5173",
            credentials: true
}))
app.use(cookieParser())
app.use("/api", router);
connectDB()

app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`)
})
