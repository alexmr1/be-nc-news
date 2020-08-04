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
      test.only("GET 404: responds with username not found if an incorrect username is introduced and status 404 ", () => {
        return request(app)
          .get("/api/users/nobodyHere")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Username not found!");
          });
      });
    });
  });
});
