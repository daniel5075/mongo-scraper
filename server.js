var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");


//scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
var PORT = 3000;
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Connection to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraperdb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

module.exports = app;