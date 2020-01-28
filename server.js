var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var db = require(".models");
var PORT = 3000;
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Connection to MongoDB
mongoose.connect("mogodb://localhost/scraper", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    axios.get("http://www.wjs.com/us").then(function (response) {
        var $ = cheerio.load(response.data);

        $("div.WSJTheme--footer--2ga8Yz85").each(function (i, element) {
            var result = {};

            // capturing title & link to article
            result.title = $(this)
                .children("div")
                .children("h3")
                .children("a")
                .text();
            result.link = $(this)
                .children("div")
                .children("h3")
                .children("a")
                .attr("href");

            // capturing synapsis of article
            result.summary = $(this)
                .children("p")
                .text();
        });
    });

    // create an Article
    db.Article.create(result)
        .then(function (dbArticle) {
            console.log(dbArticle);
        })
        .catch(function (err) {
            console.log(err);
        });
});