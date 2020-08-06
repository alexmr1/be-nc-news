const {
  fetchArticleById,
  modifyArticleVotes,
  sortArticles,
} = require("../models/articles.model");

const { checkTopic } = require("../models/topics.model");

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

exports.sendSortedArticles = (req, res, next) => {
  const query = req.query;
  const { topic } = req.query;
  // const models = [sortArticles(query)];

  // if (topic) models.push(checkTopic(topic));

  sortArticles(query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
