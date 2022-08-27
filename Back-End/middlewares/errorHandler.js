const { CustomError } = require('../errors/customError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {    
    return res
      .status(err.statusCode)
      .json({
        statusCode: err.statusCode,
        success: err.success,
        message: err.message,
      });
  }

  return res
    .status(500)
    .json({ success: err.success, message: '某處出錯，請再嘗試一次' });
};

module.exports = errorHandler;
