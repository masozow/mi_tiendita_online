import { validationResult } from "express-validator";
import { errorAndLogHandler, errorLevels } from "./errorHandler.js";
import errorMessages from "../middleware/locales.js";

const validate = (rules) => {
  return async (req, res, next) => {
    await Promise.all(rules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const translatedErrors = errors.array().map((err) => {
      const messageTemplate = errorMessages[err.msg] || err.msg;
      const message = messageTemplate.replace(
        /{(\w+)}/g,
        (_, key) => err[key] || ""
      );
      return {
        param: err.param,
        msg: message,
        location: err.location,
      };
    });

    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.warn,
        message: translatedErrors,
      })
    );
  };
};

export default validate;
