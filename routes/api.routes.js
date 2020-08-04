const { sendTopics } = require("../controllers/topics.controller");
const { sendUser } = require("../controllers/users.controller");
const { sendArticle } = require("../controllers/articles.controller");

const apiRouter = require("express").Router();

apiRouter.use("/topics", sendTopics);
apiRouter.use("/users/:username", sendUser);
apiRouter.use("/articles/:article_id", sendArticle);

module.exports = apiRouter;
