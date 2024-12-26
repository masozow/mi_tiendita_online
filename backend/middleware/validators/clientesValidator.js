import { check } from "express-validator";
import validate from "../validate.js";
import SchemaFields from "./schemaFields.js";
import errorMessages from "../locales.js";

const getClienteByIDValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const createClienteValidationRules = validate([
  check(SchemaFields.RAZON_SOCIAL)
    .notEmpty()
    .isString()
    .withMessage(errorMessages.RAZON_SOCIAL_OBLIGATORIO),
  check(SchemaFields.NOMBRE)
    .notEmpty()
    .isString()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.DIRECCION)
    .notEmpty()
    .isString()
    .withMessage(errorMessages.DIRECCION_OBLIGATORIO),
  check(SchemaFields.ID_USUARIO)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_USUARIO_INT),
  check(SchemaFields.ID_ESTADO)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
]);

const updateClienteValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
  check(SchemaFields.RAZON_SOCIAL)
    .optional()
    .notEmpty()
    .isString()
    .withMessage(errorMessages.RAZON_SOCIAL_OBLIGATORIO),
  check(SchemaFields.NOMBRE)
    .optional()
    .notEmpty()
    .isString()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.DIRECCION)
    .optional()
    .notEmpty()
    .isString()
    .withMessage(errorMessages.DIRECCION_OBLIGATORIO),
  check(SchemaFields.ID_USUARIO)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_USUARIO_INT),
  check(SchemaFields.ID_ESTADO)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
]);

const deleteClienteValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const clienteValidator = {
  getClienteByIDValidationRules,
  createClienteValidationRules,
  updateClienteValidationRules,
  deleteClienteValidationRules,
};

export default clienteValidator;
