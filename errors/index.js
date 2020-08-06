exports.handleCustomErrors = (err, req, res, next) => {
  // console.log(err);
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlBadRequestsCodes = ["22P02", "23502", "42703"];
  const psqlNotFoundCodes = ["23503"];
  if (psqlBadRequestsCodes.includes(err.code))
    res.status(400).send({ msg: "Bad Request!" });
  else if (psqlNotFoundCodes.includes(err.code))
    res.status(404).send({ msg: "Not Found!" });
  else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed!" });
};
