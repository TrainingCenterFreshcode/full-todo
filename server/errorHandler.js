const { Error: { ValidationError, CastError } } = require("mongoose");

module.exports.errorHandler = async (err, req, res, next) => {
  if(err instanceof ValidationError) {
    return res.status(400).send({ err: err.message });
  }

  if(err instanceof CastError) {
    return res.status(400).send({ err: 'Invalid id' });
  }

  console.log(err);
  return res.status(500).send({ err: 'Unkown error' });
}