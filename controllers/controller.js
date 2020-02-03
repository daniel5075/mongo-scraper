var express = require("express");
var axios = require("axios");
var router = express.Router();
var db = require("../models/index.js")
var path = require("path");
var cheerio = require("cheerio");

router.get("/", function (req, res) {
    res.redirect("/articles")
});

router.get("/scrape", function (req, res) {
    axios.get("http://www.wsj.com/us").then(function (response) {
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

            // create an Article

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });

        });
        res.redirect("/");
    });

    // res.send("Scrape Complete");
});

router.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            var hbsObject = {
                article: dbArticle
            }
            console.log(hbsObject);
            res.render("index", hbsObject);
        })
        .catch(function (err) {
            console.log(err);
        });
});

module.exports = router;
