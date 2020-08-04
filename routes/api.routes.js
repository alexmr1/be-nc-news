const { sendTopics } = require("../controllers/topics.controller");
const { sendUser } = require("../controllers/users.controller");

const apiRouter = require("express").Router();

apiRouter.use("/topics", sendTopics);
apiRouter.use("/users/:username", sendUser);
apiRouter.use("/articles", () => {
  console.log("in articles controller");
});

module.exports = apiRouter;
