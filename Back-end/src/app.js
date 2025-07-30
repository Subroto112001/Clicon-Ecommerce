const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const app = express()

/**
 * todo : All MidleWare
 * */
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

/**
 * todo : routes will there
 * */

const apiVersion = process.env.BASE_URL
app.use(`/api/v1`, require("./routes/index"));


/**
 * todo : error handle midleware
 * */

app.use((error, req, res, next) => {
    console.log(error);
    
})

module.exports = {app}