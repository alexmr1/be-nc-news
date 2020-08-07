const { sendTopics } = require("../controllers/topics.controller");
const { sendAllEndPoints } = require("../controllers/allEndpoints.controller");

const articlesRouter = require("../routes/articles.routes");
const usersRouter = require("./users.routes");
const commentsRouter = require("./comments.routes");

const apiRouter = require("express").Router();

apiRouter.use("/topics", sendTopics);
apiRouter.use("/users/", usersRouter);
apiRouter.use("/articles/", articlesRouter);
apiRouter.use("/comments/", commentsRouter);
apiRouter.route("/").get(sendAllEndPoints);

module.exports = apiRouter;
