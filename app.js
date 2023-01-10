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
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;

        let data = {
            members: [
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
            auth: process.env.API_key_Auth
        };

        const request = https.request(url, Options, (resp) => {

            if (resp.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
            resp.on("data", (data) => {
                JSON.parse(data);
            });
        });
        request.write(jsonData);
        request.end();

    } catch (error) {
        console.log(error.message);
    };

});

app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});