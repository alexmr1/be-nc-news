const { fetchUser } = require("../models/users.model");

exports.sendUser = (req, res, next) => {
  // console.log(req.params);
  const username = req.params;
  fetchUser(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};
