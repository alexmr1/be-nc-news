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
    describe.only("/articles/:article_id/comments", () => {
      test("POST: 201 - posts a new comment for an article id && status 201 ", () => {
        const commentToAdd = {
          username: "mabojambo",
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
                author: "mabojambo",
                article_id: 9,
                votes: 0,
                created_at: expect.any(String),
                body: "This is an intriguing article.",
              })
            );
          });
      });
    });
  });
});
