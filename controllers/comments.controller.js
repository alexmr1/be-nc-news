const { newComment, fetchComments } = require("../models/comments.model");

exports.addComment = (req, res, next) => {
  const articleId = req.params;
  const commentInfo = req.body;
  newComment(articleId, commentInfo)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.sendComments = (req, res, next) => {
  fetchComments(req.params, req.query)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
