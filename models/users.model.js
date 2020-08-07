const knex = require("../db/connection");

exports.fetchUserByUsername = ({ username }) => {
  return knex
    .select("*")
    .from("users")
    .where("username", "=", username)
    .returning("*")
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Username ${username} not found!`,
        });
      }
      return result[0];
    });
};

exports.selectAuthorByName = (author) => {
  return knex
    .select()
    .from("users")
    .where("username", "=", author)
    .then((author) => {
      return author.length !== 0
        ? author
        : Promise.reject({ status: 404, msg: "Author not found!" });
    });
};
