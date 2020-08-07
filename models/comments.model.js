const knex = require("../db/connection");
const { request } = require("express");

exports.newComment = ({ article_id }, commentInfo) => {
  const newComment = {};
  newComment.author = commentInfo.username;
  newComment.article_id = article_id;
  newComment.body = commentInfo.body;
  newComment.created_at = new Date();

  return knex
    .insert(newComment)
    .into("comments")
    .returning("*")
    .then((comment) => {
      return comment[0];
    });
};

exports.fetchComments = (
  { article_id },
  { sort_by = "created_at", order = "desc" }
) => {
  return knex
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .orderBy([
      {
        column: sort_by,
        order,
      },
    ])
    .where("comments.article_id", "=", article_id)
    .returning("*")
    .then((comments) => {
      return comments.length !== 0
        ? comments
        : Promise.reject({ status: 404, msg: "Not Found!" });
    });
};

exports.modifyComment = ({ comment_id }, body) => {
  if (Object.keys(body).length === 0) {
    return Promise.reject({ status: 400, msg: "Bad Request!" });
  } else if (Object.keys(body).length !== 0) {
    if (Object.keys(body)[0] !== "inc_votes") {
      return Promise.reject({ status: 400, msg: "Bad Request!" });
    }
  }

  return knex
    .select()
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .increment("votes", body.inc_votes)
    .returning("*")
    .then((result) => {
      // console.log(result);
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Comment id ${comment_id} not found!`,
        });
      }
      return result[0];
    });
};

exports.fetchAllComments = () => {
  return knex
    .select()
    .from("comments")
    .returning("*")
    .then((result) => {
      return result;
    });
};

exports.removeComment = (comment_id) => {
  return knex
    .select()
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .del()
    .then((deleteCount) => {
      if (deleteCount === 0)
        return Promise.reject({ status: 404, msg: "Comment id not found!" });
    });
};
