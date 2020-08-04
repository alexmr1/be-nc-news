const { sendTopics } = require("../controllers/topics.controller");

const apiRouter = require("express").Router();

apiRouter.use("/topics", sendTopics);

module.exports = apiRouter;
