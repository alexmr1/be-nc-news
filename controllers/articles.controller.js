const {
  fetchArticleById,
  modifyArticleVotes,
} = require("../models/articles.model");

exports.sendArticle = (req, res, next) => {
  const articleId = req.params;
  fetchArticleById(articleId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.amendArticle = (req, res, next) => {
  const patch = req.body;
  const articleId = req.params;
  modifyArticleVotes(articleId, patch)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
