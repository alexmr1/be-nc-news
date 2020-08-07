const jsonObj = require("../endpoints.json");

exports.sendAllEndPoints = (req, res) => {
  res.status(200).send(jsonObj);
};
