import { check } from "express-validator";
import validate from "../validate.js";
import SchemaFields from "./schemaFields.js";
import errorMessages from "../locales.js";

const getRolByIDValidationRules = validate([
  check(SchemaFields.ID).isInt().withMessage(errorMessages.ID_INT),
]);

const createRolValidationRules = validate([
  check(SchemaFields.NOMBRE)
    .notEmpty()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
]);

const updateRolValidationRules = validate([
  check(SchemaFields.ID).isInt().withMessage(errorMessages.ID_INT),
  check(SchemaFields.NOMBRE)
    .optional()
    .notEmpty()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.ID_ESTADO)
    .optional()
    .isInt()
    .withMessage(errorMessages.ID_ESTADO_INT),
]);

const deleteRolValidationRules = validate([
  check(SchemaFields.ID).isInt().withMessage(errorMessages.ID_INT),
]);

const rolValidator = {
  getRolByIDValidationRules,
  createRolValidationRules,
  updateRolValidationRules,
  deleteRolValidationRules,
};

export default rolValidator;
