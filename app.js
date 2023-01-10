const express = require('express');
const https = require('node:https');

require('dotenv').config();

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json())


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html" )
})


app.post("/", (req, res) => {
    // res.sendFile(__dirname + "/index.html");
    console.log(req.body.cityName);
    console.log("Post request received.")
    const query = req.body.cityName
    const apiKey = process.env.API_KEY
    const unit = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units=" + unit


    https.get(url, (response) => {
        // console.log(response);
        console.log('statusCode:', response.statusCode);
        // console.log('headers:', response.headers);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/w/" + icon + ".png"
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Farenheit.</h1>")
            res.write("<p>The current weather condition is " + desc + " </p>")
            res.write("<img src= " + imageUrl + " >")
            console.log(temp);
            console.log(desc);
            console.log(weatherData);
            res.send();
    });
})
})






app.listen(3000, function(){
    console.log("Server is running on port 3000.")
})

