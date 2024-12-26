import { check } from "express-validator";
import validate from "../validate.js";
import SchemaFields from "./schemaFields.js";
import errorMessages from "../locales.js";

const getOperadorByIDValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const createOperadorValidationRules = validate([
  check(SchemaFields.ID_USUARIO)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_USUARIO_INT),
  check(SchemaFields.ID_ESTADO)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
]);

const updateOperadorValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
  check(SchemaFields.ID_USUARIO)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_USUARIO_INT),
  check(SchemaFields.ID_ESTADO)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
]);

const deleteOperadorValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const operadorValidator = {
  getOperadorByIDValidationRules,
  createOperadorValidationRules,
  updateOperadorValidationRules,
  deleteOperadorValidationRules,
};

export default operadorValidator;
