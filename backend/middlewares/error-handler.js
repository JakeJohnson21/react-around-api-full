const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(err.statusCode).send({
    message: statusCode === 500 ? "An error occured on the server" : message,
  });
  return next();
};

module.exports = errorHandler;
