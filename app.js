const express = require("express");
const apiRouter = require("./routes/api.routes");
// const {
//   handleCustomErrors,
//   handlePsqlErrors,
//   handleServerErrors,
// } = require("./errors/index");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Route not found!" });
});

// app.use(handleCustomErrors);
// app.use(handlePsqlErrors);
// app.use(handleServerErrors);

module.exports = app;
