const express = require("express");
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const https = require('https')
// const { PORT } = process.env;
const port = process.env.PORT;


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    try {
        let fName = req.body.firstName;
        let lName = req.body.lastName;
        let email = req.body.email;
        let username = req.body.username;

        let data = {
            member: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }
            ]
        }

        const jsonData = JSON.stringify(data);

        const url = process.env.URL;

        const Options = {
            method: "POST",
            auth: process.env.API_key - Auth
        }

        const request = https.request(url, Options, (resp) => {
            resp.on("data", (data) => {
                JSON.parse(data);
            })
        })
        request.write(jsonData);
        request.end();

        // console.log(fName, lName, email, username);
        res.redirect("/success");
    } catch (error) {
        console.log(error.message);
    }

})

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/success.html")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})