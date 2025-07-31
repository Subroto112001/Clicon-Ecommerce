exports.globalErrorHandeler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    statusCode: error.statusCode,
    status: error.status,
    isOperationalError: error.isOperationalError,
    ErrortrackTrace: error.stack,
      message: error.message,
    data : error.data
  });
};