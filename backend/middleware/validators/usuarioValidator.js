import { check } from "express-validator";
import validate from "../validate.js";
import SchemaFields from "./schemaFields.js";
import errorMessages from "../locales.js";

const getUsuarioByIDValidationRules = validate([
  check(SchemaFields.ID).isInt().withMessage(errorMessages.ID_INT),
]);

const createUsuarioValidationRules = validate([
  check(SchemaFields.CORREO).isEmail().withMessage(errorMessages.CORREO_VALIDO),
  check(SchemaFields.NOMBRE)
    .notEmpty()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.PASSWORD)
    .isLength({ min: 6 })
    .withMessage(errorMessages.PASSWORD_MIN),
  check(SchemaFields.TELEFONO)
    .notEmpty()
    .withMessage(errorMessages.TELEFONO_OBLIGATORIO),
  check(SchemaFields.FECHA_NACIMIENTO)
    .isDate()
    .withMessage(errorMessages.FECHA_NACIMIENTO_VALIDA),
  check(SchemaFields.ID_ESTADO)
    .isInt()
    .withMessage(errorMessages.ID_ESTADO_INT),
  check(SchemaFields.ID_ROL).isInt().withMessage(errorMessages.ID_ROL_INT),
]);

const updateUsuarioValidationRules = validate([
  check(SchemaFields.ID).isInt().withMessage(errorMessages.ID_INT),
  check(SchemaFields.CORREO)
    .optional()
    .isEmail()
    .withMessage(errorMessages.CORREO_VALIDO),
  check(SchemaFields.NOMBRE)
    .optional()
    .notEmpty()
    .withMessage(errorMessages.NOMBRE_OBLIGATORIO),
  check(SchemaFields.PASSWORD)
    .optional()
    .isLength({ min: 6 })
    .withMessage(errorMessages.PASSWORD_MIN),
  check(SchemaFields.TELEFONO)
    .optional()
    .notEmpty()
    .withMessage(errorMessages.TELEFONO_OBLIGATORIO),
  check(SchemaFields.FECHA_NACIMIENTO)
    .optional()
    .isDate()
    .withMessage(errorMessages.FECHA_NACIMIENTO_VALIDA),
  check(SchemaFields.ID_ESTADO)
    .optional()
    .isInt()
    .withMessage(errorMessages.ID_ESTADO_INT),
  check(SchemaFields.ID_ROL)
    .optional()
    .isInt()
    .withMessage(errorMessages.ID_ROL_INT),
]);

const deleteUsuarioValidationRules = validate([
  check(SchemaFields.ID).isInt().withMessage(errorMessages.ID_INT),
]);

const loginUsuarioValidationRules = validate([
  check(SchemaFields.CORREO).isEmail().withMessage(errorMessages.CORREO_VALIDO),
  check(SchemaFields.PASSWORD)
    .isLength({ min: 6 })
    .withMessage(errorMessages.PASSWORD_MIN),
]);

const usuarioValidator = {
  getUsuarioByIDValidationRules,
  createUsuarioValidationRules,
  updateUsuarioValidationRules,
  deleteUsuarioValidationRules,
  loginUsuarioValidationRules,
};

export default usuarioValidator;
