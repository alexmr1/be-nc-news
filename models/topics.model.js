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

exports.selectTopicByName = (topic) => {
  return knex
    .select()
    .from("topics")
    .where("slug", "=", topic)
    .then((topic) => {
      return topic.length !== 0
        ? topic
        : Promise.reject({ status: 404, msg: "Topic not found!" });
    });
};
