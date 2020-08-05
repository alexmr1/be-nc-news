const { sendArticle } = require("../controllers/articles.controller");
const { handle405s } = require("../errors");

const articlesRouter = require("express").Router();

articlesRouter.use("/:article_id", sendArticle);

articlesRouter.all("/:article_id", handle405s);

module.exports = articlesRouter;
