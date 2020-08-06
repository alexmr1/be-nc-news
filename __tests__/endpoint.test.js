const request = require("supertest");
const knex = require("../db/connection");
const app = require("../app");

describe("app", () => {
  afterAll(() => {
    return knex.destroy();
  });

  describe("/api", () => {
    beforeEach(() => {
      return knex.seed.run();
    });

    describe("/topics", () => {
      test("GET 200: responds with an array of topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then((res) => {
            expect(res.body.topics.length).toBe(3);
            res.body.topics.forEach((topic) => {
              expect(topic).toEqual(
                expect.objectContaining({
                  slug: expect.any(String),
                  description: expect.any(String),
                })
              );
            });
          });
      });
      test("GET 404: responds with  Route not found message and 404 status code when the wrong endpoint is introduced", () => {
        return request(app)
          .get("/api/topi")
          .expect(404)
          .then((result) => {
            expect(result.body.msg).toBe("Route not found!");
          });
      });
    });
    describe("/users/:username", () => {
      test("GET 200: responds with the correct user objects and status code 200", () => {
        return request(app)
          .get("/api/users/lurker")
          .expect(200)
          .then((res) => {
            expect(res.body.user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                avatar_url: expect.any(String),
                name: expect.any(String),
              })
            );
          });
      });
      test("GET 404: responds with username not found if an incorrect username is introduced and status 404 ", () => {
        return request(app)
          .get("/api/users/nobodyHere")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Username nobodyHere not found!");
          });
      });
      test("INVALID METHODS /api/users/:username, 405", () => {
        const invalidMethods = ["put", "patch", "del", "post"];
        const promises = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/users/1")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Method not allowed!");
            });
        });
        return Promise.all(promises);
      });
    });
    describe("/articles/:article_id", () => {
      test("GET 200: responds with the correct article based on the article_id ", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then((res) => {
            expect(res.body.article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comments_count: expect.any(Number),
              })
            );
          });
      });
      test("GET 404: responds with article_id is not found and 404 code", () => {
        return request(app)
          .get("/api/articles/4689")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Article id 4689 not found!");
          });
      });
      test("GET 400: responds with Bad request invalid article_id input", () => {
        return request(app)
          .get("/api/articles/thisart")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad Request!");
          });
      });
      test("INVALID METHODS /api/articles/:article_id, 405", () => {
        const invalidMethods = ["put", "del"];
        const promises = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/articles/1")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Method not allowed!");
            });
        });
        return Promise.all(promises);
      });
      test("PATCH 200: updates the number of votes and returns the updated article", () => {
        const patchForArticle = { inc_votes: 10 };
        return request(app)
          .patch("/api/articles/1")
          .send(patchForArticle)
          .expect(200)
          .then((res) => {
            expect(res.body.article).toEqual({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 110,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z",
            });
          })
          .then((res) => {
            return request(app).get("/api/articles/1");
          })
          .then((res) => {
            expect(res.body.article.votes).toBe(110);
          });
      });
      test("PATCH 404: article_id not found", () => {
        const patchForArticle = { inc_votes: -10 };
        return request(app)
          .patch("/api/articles/7415")
          .send(patchForArticle)
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Article id 7415 not found!");
          });
      });
      test("PATCH 400: bad request response and status 400", () => {
        const patchForArticle = { inc_votes: "no_votes" };
        return request(app)
          .patch("/api/articles/1")
          .send(patchForArticle)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad Request!");
          });
      });
    });
    describe("/articles/:article_id/comments", () => {
      test("POST: 201 - posts a new comment for an article id && status 201 ", () => {
        const commentToAdd = {
          username: "rogersop",
          body: "This is an intriguing article.",
        };
        return request(app)
          .post("/api/articles/1/comments")
          .send(commentToAdd)
          .expect(201)
          .then((res) => {
            expect(res.body.comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                author: "rogersop",
                article_id: 1,
                votes: 0,
                created_at: expect.any(String),
                body: "This is an intriguing article.",
              })
            );
          });
      });
      test("POST: 404 - Not found - article_id not present in articles", () => {
        const commentToAdd = {
          username: "rogersop",
          body: "This is an intriguing article.",
        };
        return request(app)
          .post("/api/articles/523/comments")
          .send(commentToAdd)
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Not Found!");
          });
      });
      test("POST: 404 - Not found - username not present in comments", () => {
        const commentToAdd = {
          username: "nobodyHere",
          body: "This is an intriguing article.",
        };
        return request(app)
          .post("/api/articles/9/comments")
          .send(commentToAdd)
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Not Found!");
          });
      });
      test("POST: 400 - Bad request - no body present in the request", () => {
        return request(app)
          .post("/api/articles/3/comments")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad Request!");
          });
      });
      test("POST 404: responds with  Route not found message and 404 status code when the wrong endpoint is introduced", () => {
        return request(app)
          .post("/api/articl")
          .expect(404)
          .then((result) => {
            expect(result.body.msg).toBe("Route not found!");
          });
      });
      test("INVALID METHODS /articles/:article_id/comments, status 405", () => {
        const invalidMethods = ["put", "del", "patch"];
        const promises = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/articles/:article_id/comments")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Method not allowed!");
            });
        });
        return Promise.all(promises);
      });
      test("GET: 200 - returns the comments for a given article_id && status 200", () => {
        return request(app)
          .get("/api/articles/9/comments")
          .expect(200)
          .then((res) => {
            res.body.comments.forEach((comment) => {
              expect(comment).toEqual(
                expect.objectContaining({
                  comment_id: expect.any(Number),
                  votes: expect.any(Number),
                  created_at: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                })
              );
            });
          });
      });
      test("GET: 200 - returns the comments sorted by votes and displays them in descending order", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes")
          .expect(200)
          .then((res) => {
            expect(res.body.comments).toBeSortedBy("votes", {
              descending: true,
            });
          });
      });
      test("GET: 200 - returns the comments sorted by comment_id and displays them in ascending order", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=comment_id&&order=asc")
          .expect(200)
          .then((res) => {
            expect(res.body.comments).toBeSortedBy("comment_id", {
              ascending: true,
            });
          });
      });
      test("GET: 400 - returns bad request for sort_by a column that does not exist", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=pens")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad Request!");
          });
      });
      test("GET: 404 - returns not found - article_id not present in articles ", () => {
        return request(app)
          .get("/api/articles/234/comments?sort_by=votes")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Not Found!");
          });
      });
      test("GET: 400 - returns Bad Request if the article_id is invalid", () => {
        return request(app)
          .get("/api/articles/art_no/comments?sort_by=votes")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad Request!");
          });
      });
      test("GET: 405 - returns a route not found message for the wrong path ", () => {
        return request(app)
          .get("/api/articles/1/commen")
          .expect(404)
          .then((result) => {
            expect(result.body.msg).toBe("Route not found!");
          });
      });
    });
    describe.only("/api/articles - accepting different queries ", () => {
      test("GET 200: gets all the articles with the correct properties sort_by the default value", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            res.body.articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.any(Number),
                })
              );
            });
            expect(res.body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });
      test("GET 200: filters the articles by the author specified in the query,default order", () => {
        return request(app)
          .get("/api/articles?author=rogersop")
          .expect(200)
          .then((res) => {
            res.body.articles.forEach((article) => {
              expect(article.author).toBe("rogersop");
            });
            expect(res.body.articles.length).toBe(3);
            expect(res.body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });
      test("GET 200: filters the articles by the topic specified in the query,default order", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then((res) => {
            console.log(res.body.articles);
            res.body.articles.forEach((article) => {
              expect(article.topic).toBe("mitch");
            });
            expect(res.body.articles).toBeSortedBy("created_at", {
              descending: true,
            });
          });
      });
    });
  });
});
