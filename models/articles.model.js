const knex = require("../db/connection");
const { leftJoin } = require("../db/connection");

exports.fetchArticleById = ({ article_id }) => {
  return knex
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where("articles.article_id", "=", article_id)
    .groupBy("articles.article_id")
    .count("comments.article_id", { as: "comments_count" })
    .returning("*")
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Article id ${article_id} not found!`,
        });
      }
      return {
        ...result[0],
        comments_count: parseInt(result[0].comments_count, 10),
      };
    });
};
