import { check } from "express-validator";
import validate from "../validate.js";
import SchemaFields from "./schemaFields.js";
import errorMessages from "../locales.js";

const getMarcaByIDValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const createMarcaValidationRules = validate([
  check(SchemaFields.NOMBRE)
    .notEmpty()
    .isString()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.ID_ESTADO)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
]);

const updateMarcaValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
  check(SchemaFields.NOMBRE)
    .optional()
    .notEmpty()
    .isString()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.ID_ESTADO)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
]);

const deleteMarcaValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const marcaValidator = {
  getMarcaByIDValidationRules,
  createMarcaValidationRules,
  updateMarcaValidationRules,
  deleteMarcaValidationRules,
};

export default marcaValidator;
