function notFound(req, res, next) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // eslint-disable-next-line no-console
  console.error(err);

  res.status(status).json({ message });
}

module.exports = { notFound, errorHandler };

