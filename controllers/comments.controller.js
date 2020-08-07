const {
  newComment,
  fetchComments,
  modifyComment,
  fetchAllComments,
  removeComment,
} = require("../models/comments.model");

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

exports.sendAmendedComment = (req, res, next) => {
  modifyComment(req.params, req.body)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.sendAllComments = (req, res) => {
  fetchAllComments().then((comments) => {
    res.status(200).send({ comments });
  });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
