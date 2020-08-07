const {
  sendAmendedComment,
  sendAllComments,
  deleteComment,
} = require("../controllers/comments.controller");

const { handle405s } = require("../errors");

const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .patch(sendAmendedComment)
  .delete(deleteComment)
  .all(handle405s);

commentsRouter.route("/").get(sendAllComments);

module.exports = commentsRouter;
