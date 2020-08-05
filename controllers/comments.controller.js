const { newComment } = require("../models/comments.model");

exports.addComment = (req, res, next) => {
  const articleId = req.params;
  const commentInfo = req.body;
  console.log(req.params);
  console.log(commentInfo);
  newComment(articleId, commentInfo).then((comment) => {
    res.status(201).send({ comment });
  });
};
