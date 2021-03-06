const {
  sendArticle,
  amendArticle,
  sendSortedArticles,
} = require("../controllers/articles.controller");

const {
  addComment,
  sendComments,
} = require("../controllers/comments.controller");

const { handle405s } = require("../errors");

const articlesRouter = require("express").Router();

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(amendArticle)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .post(addComment)
  .get(sendComments)
  .all(handle405s);

articlesRouter.route("/").get(sendSortedArticles).all(handle405s);

module.exports = articlesRouter;
