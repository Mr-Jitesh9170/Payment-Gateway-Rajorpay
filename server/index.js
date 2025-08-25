const dotenv = require("dotenv").config();
const express = require("express")
const cors = require("cors")

const app = express();

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json());

app.use(require("./routes/rajorpay.js"))

app.listen(8080, () => {
    console.log("Server is running at 8080")
})