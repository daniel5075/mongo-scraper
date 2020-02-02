var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/article", function (req, res) {
    db.Article.findAll({}).then(function (dbArticle) {
      res.json(dbArticle);
    });
  });

  // Create a new example
  app.post("/api/article", function (req, res) {
    db.Article.create(req.body).then(function (dbArticle) {
      res.json(dbArticle);
    });
  });

  // Delete an example by id
  app.delete("/api/article/:id", function (req, res) {
    db.Article.destroy({ where: { id: req.params.id } }).then(function (dbArticle) {
      res.json(dbArticle);
    });
  });
};
