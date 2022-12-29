const express = require("express");
const env = require('dotenv').config();
const bodyParser = require('body-parser');
// const { PORT } = process.env;
const port = process.env.PORT;


const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    let fName = req.body.firstName;
    let lName = req.body.lastName;
    let email = req.body.email;

console.log( fName, lName, email);

})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})