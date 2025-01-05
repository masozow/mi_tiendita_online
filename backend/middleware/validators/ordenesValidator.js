import { check } from "express-validator";
import validate from "../validate.js";
import SchemaFields from "./schemaFields.js";
import errorMessages from "../locales.js";

const getOrdenByIDValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const createOrdenValidationRules = validate([
  check(SchemaFields.NOMBRE)
    .notEmpty()
    .isString()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.DIRECCION)
    .notEmpty()
    .isString()
    .withMessage(errorMessages.DIRECCION_OBLIGATORIO),
  check(SchemaFields.TELEFONO)
    .notEmpty()
    .withMessage(errorMessages.TELEFONO_OBLIGATORIO),
  check(SchemaFields.CORREO)
    .notEmpty()
    .isEmail()
    .withMessage(errorMessages.CORREO_VALIDO),
  check(SchemaFields.FECHA_ENTREGA) //quité .isDate() ,para probar si ya funciona
    .notEmpty()
    .isDate()
    .withMessage(errorMessages.FECHA_ENTREGA_VALIDA),
  check(SchemaFields.TOTAL)
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage(errorMessages.TOTAL_OBLIGATORIO),
  check(SchemaFields.ID_ESTADO)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
  check(SchemaFields.ID_CLIENTE)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_CLIENTE_INT),
  check(SchemaFields.DETALLE)
    .notEmpty()
    .isArray()
    .withMessage(errorMessages.DETALLE_OBLIGATORIO),
]);

const updateOrdenValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
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
  check(SchemaFields.TELEFONO)
    .optional()
    .notEmpty()
    .isString()
    .withMessage(errorMessages.TELEFONO_OBLIGATORIO),
  check(SchemaFields.CORREO)
    .optional()
    .notEmpty()
    .isEmail()
    .withMessage(errorMessages.CORREO_VALIDO),
  check(SchemaFields.FECHA_ENTREGA)
    .optional()
    .notEmpty()
    .isDate()
    .withMessage(errorMessages.FECHA_ENTREGA_VALIDA),
  check(SchemaFields.TOTAL)
    .optional()
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage(errorMessages.TOTAL_OBLIGATORIO),
  check(SchemaFields.ID_ESTADO)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
  check(SchemaFields.ID_CLIENTE)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_CLIENTE_INT),
  check(SchemaFields.DETALLE)
    .optional()
    .notEmpty()
    .isJSON()
    .withMessage(errorMessages.DETALLE_OBLIGATORIO),
]);

const deleteOrdenValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const ordenValidator = {
  getOrdenByIDValidationRules,
  createOrdenValidationRules,
  updateOrdenValidationRules,
  deleteOrdenValidationRules,
};

export default ordenValidator;
