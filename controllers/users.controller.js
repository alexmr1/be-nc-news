const { fetchUserByUsername } = require("../models/users.model");

exports.sendUser = (req, res, next) => {
  // console.log(req.params);

  const username = req.params;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
