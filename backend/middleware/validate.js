import { validationResult } from "express-validator";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

const validate = (rules) => {
  return async (req, res, next) => {
    console.log("req body in validate middleware: ", req.body);
    await Promise.all(rules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: errors.array(),
        })
      );
    }
    next();
  };
};

export default validate;
