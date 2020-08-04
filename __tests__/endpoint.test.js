const request = require("supertest");
const knex = require("../db/connection");
const app = require("../app");

describe("/api", () => {
  describe("/topics", () => {
    test("GET: responds with an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          console.log(res.body);
        });
    });
  });
});
