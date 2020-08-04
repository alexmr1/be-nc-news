const knex = require("../db/connection");

exports.fetchTopics = () => {
  return knex
    .select("*")
    .from("topics")
    .returning("*")
    .then((result) => {
      return result;
    });
};
