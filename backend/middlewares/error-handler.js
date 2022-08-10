module.exports = (err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({
      message: (statusCode = 500 ? "An error occured on the server" : message),
    });
};
