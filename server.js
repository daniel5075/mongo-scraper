var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();
app.use(express.static("public"));

//Parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Connection to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraperdb";
mongoose.connect(MONGODB_URI);

// Routes
var routes = require("./controllers/controller.js");
app.use("/", routes);




app.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});
module.exports = app;