const { sendUser } = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.use("/:username", sendUser);

module.exports = usersRouter;
