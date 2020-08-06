const knex = require("../db/connection");

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
