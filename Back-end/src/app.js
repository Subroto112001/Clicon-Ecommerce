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
 * todo : error handle
 * */

app.use((error, req, res, next) => {
    console.log(error);
    
})

module.exports = {app}