const knex = require("../db/connection");

exports.fetchTopics = () => {
  return knex
    .select("*")
    .from("topics")
    .returning("*")
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

exports.checkTopic = (topic) => {
  return knex
    .select("*")
    .from("topics")
    .where("slug", "=", topic)
    .returning("*")
    .then((topic) => {
      if (topic.length === 0)
        return Promise.reject({ status: 404, msg: "Topic not found!" });
    });
};
