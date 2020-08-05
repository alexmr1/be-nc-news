const { sendUser } = require("../controllers/users.controller");
const { handle405s } = require("../errors");

const usersRouter = require("express").Router();

usersRouter.route("/:username").get(sendUser).all(handle405s);

module.exports = usersRouter;
