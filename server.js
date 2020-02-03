var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var bodyParser = require("body-parser");
// //scraping tools
// var axios = require("axios");
// var cheerio = require("cheerio");

// var db = require("./models");
var PORT = 3000;
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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.use("/", routes);

// app.get("/scrape", function (req, res) {
//     axios.get("http://www.wsj.com/us").then(function (response) {
//         var $ = cheerio.load(response.data);

//         $("div.WSJTheme--footer--2ga8Yz85").each(function (i, element) {
//             var result = {};

//             // capturing title & link to article
//             result.title = $(this)
//                 .children("div")
//                 .children("h3")
//                 .children("a")
//                 .text();
//             result.link = $(this)
//                 .children("div")
//                 .children("h3")
//                 .children("a")
//                 .attr("href");

//             // capturing synapsis of article
//             result.summary = $(this)
//                 .children("p")
//                 .text();

//             // create an Article

//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     console.log(err);
//                 });

//         });
//        res.
//     });

//     // res.send("Scrape Complete");
// });
// app.get("/", function (req, res) {
//     db.Article.find({})
//         .then(function (dbArticle) {
//             console.log(dbArticle);
//             res.render("index", { articles: dbArticle });
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// });


// app.get("/articles/:id", function (req, res) {
//     db.Article.findOne({ _id: req.params.id })
//         .populate("comment")
//         .then(function (dbArticle) {
//             console.log(dbArticle)
//             res.render("article", { article: dbArticle });
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// app.post("/articles/:id/comments", function (req, res) {
//     db.Comment.create(req.body)
//         .then(function (dbComment) {
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
//         })
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });
app.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});
module.exports = app;