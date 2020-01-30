var db = require("../models");
let axios = require("axios");
let cheerio = require("cheerio")

module.exports = function (app) {

  app.get("/scrape", function (req, res) {
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
    });
    res.send("Scrape Complete");
  });
}