import constant from "../constants/constant.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.error(err.stack);

  switch (statusCode) {
    case constant.UNAUTHORIZED:
      res.json({
        title: "Unauthorised Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constant.BAD_REQUEST:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constant.FORBIDDEN:
      res.json({
        title: "Forbidden Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constant.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constant.Internal_Server_Error:
      res.json({
        title: "Internal server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;


    default:
    console.log("No error detected")
  }
};

export default errorHandler;
