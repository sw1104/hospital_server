function errorHandler(err, req, res, next) {
  res.status(err.status).json({ message: err.message, statusCode: err.status });
}

module.exports = errorHandler;
