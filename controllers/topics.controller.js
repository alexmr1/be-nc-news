const { fetchTopics } = require("../models/topics.model");

exports.sendTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      console.log(topics);
      res.status(200).send({ topics });
    })
    .catch((error) => {
      next(error);
    });
};
