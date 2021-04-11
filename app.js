const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

  // res.send("Server is up and Running");

});
app.post("/", function(req, res) {



  const query = req.body.cityName;
  const appId = "fb02a1f583c62e32a9d03c8dc4515d17";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appId + "&units=" + unit;


  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.set("Content-Type", "text/html");

      res.write("The weather is currently " + description);
      res.write("<h1>The Temperature in " + query + " is " + temp + " degree Celcius</h1>");
      res.write("<img src = " + image + ">");
      res.send();
      console.log(description);
      console.log(temp);


    });
  });
})
app.listen(3000, function() {

  console.log("server is running on port 3000");
});
