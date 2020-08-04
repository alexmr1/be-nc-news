const knex = require("../db/connection");

exports.fetchUser = ({ username }) => {
  return knex
    .select("*")
    .from("users")
    .where("username", "=", username)
    .returning("*")
    .then((result) => {
      return result[0];
    });
};
