const {
  sendArticle,
  amendArticle,
} = require("../controllers/articles.controller");

const { handle405s } = require("../errors");

const articlesRouter = require("express").Router();

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(amendArticle)
  .all(handle405s);

module.exports = articlesRouter;
