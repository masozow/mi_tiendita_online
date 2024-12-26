import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";
import { upload } from "./upload.js";

const errorFormatter = async (err, req, res, next) => {
  if (err) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: err.message,
        userId: req.user ? req.user.id : null,
      })
    );
  } else {
    next();
  }
};

const uploadErrorMiddleware = async (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return errorFormatter(err, req, res, next);
    }
    next();
  });
};

export { uploadErrorMiddleware };
