const express = require("express");
const env = require('dotenv').config();
// const { PORT } = process.env;
const port = process.env.PORT;


const app = express()


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})