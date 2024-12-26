import { check } from "express-validator";
import validate from "../validate.js";
import SchemaFields from "./schemaFields.js";
import errorMessages from "../locales.js";

const getEstadoByIDValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const createEstadoValidationRules = validate([
  check(SchemaFields.NOMBRE)
    .notEmpty()
    .isString()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
]);

const updateEstadoValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
  check(SchemaFields.NOMBRE)
    .optional()
    .notEmpty()
    .isString()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.USABLE)
    .optional()
    .isBoolean()
    .withMessage(errorMessages.USABLE_BOOLEAN),
]);

const deleteEstadoValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const estadoValidator = {
  getEstadoByIDValidationRules,
  createEstadoValidationRules,
  updateEstadoValidationRules,
  deleteEstadoValidationRules,
};

export default estadoValidator;
