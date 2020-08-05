const { addComment } = require("../controllers/comments.controller");

const { handle405s } = require("../errors");

const commentsRouter = require("express").Router();

commentsRouter.route("/").post(addComment);

module.exports = commentsRouter;
