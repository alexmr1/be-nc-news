const {
  fetchArticleById,
  modifyArticleVotes,
  sortArticles,
} = require("../models/articles.model");

const { selectTopicByName } = require("../models/topics.model");
const { selectAuthorByName } = require("../models/users.model");

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
  const { author } = req.query;
  const models = [sortArticles(query)];

  if (topic) models.push(selectTopicByName(topic));
  if (author) models.push(selectAuthorByName(author));

  Promise.all(models)

    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
