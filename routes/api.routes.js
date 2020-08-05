const { sendTopics } = require("../controllers/topics.controller");

const articlesRouter = require("../routes/articles.routes");
const usersRouter = require("./users.routes");
const commentsRouter = require("./comments.routes");

const apiRouter = require("express").Router();

apiRouter.use("/topics", sendTopics);
apiRouter.use("/users/", usersRouter);
apiRouter.use("/articles/", articlesRouter);
apiRouter.use("/articles/:article_id/comments", commentsRouter);

module.exports = apiRouter;
