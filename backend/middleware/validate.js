import { errorLevels } from "../utilities/errorHandler.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res
      .status(400)
      .json({ success: errorLevels.error, message: errors.join(", ") });
  }
  next();
};
