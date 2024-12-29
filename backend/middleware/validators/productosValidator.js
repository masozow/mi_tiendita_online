import { check } from "express-validator";
import validate from "../validate.js";
import SchemaFields from "./schemaFields.js";
import errorMessages from "../locales.js";

const getProductoByIDValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const createProductoValidationRules = [
  check(SchemaFields.CODIGO_PRODUCTO)
    .notEmpty()
    .withMessage(errorMessages.CODIGO_PRODUCTO_OBLIGATORIO)
    .isString()
    .withMessage(errorMessages.CODIGO_PRODUCTO_STRING),
  check(SchemaFields.NOMBRE_PRODUCTO)
    .notEmpty()
    .withMessage(errorMessages.NOMBRE_PRODUCTO_OBLIGATORIO)
    .isString()
    .withMessage(errorMessages.NOMBRE_PRODUCTO_STRING),
  check(SchemaFields.STOCK_PRODUCTO)
    .notEmpty()
    .withMessage(errorMessages.STOCK_PRODUCTO_OBLIGATORIO)
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage(errorMessages.STOCK_PRODUCTO_FLOAT),
  check(SchemaFields.COSTO_PRODUCTO)
    .notEmpty()
    .withMessage(errorMessages.COSTO_PRODUCTO_OBLIGATORIO)
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage(errorMessages.COSTO_PRODUCTO_FLOAT),
  check(SchemaFields.PRECIO_PRODUCTO)
    .notEmpty()
    .withMessage(errorMessages.PRECIO_PRODUCTO_OBLIGATORIO)
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage(errorMessages.PRECIO_PRODUCTO_FLOAT),
  check(SchemaFields.ID_CATEGORIA)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_CATEGORIA_INT),
  check(SchemaFields.ID_ESTADO)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
  check(SchemaFields.ID_MARCA)
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_MARCA_INT),
];

const updateProductoValidationRules = [
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
  check(SchemaFields.CODIGO_PRODUCTO)
    .optional()
    .notEmpty()
    .withMessage(errorMessages.CODIGO_PRODUCTO_OBLIGATORIO)
    .isString()
    .withMessage(errorMessages.CODIGO_PRODUCTO_STRING),
  check(SchemaFields.NOMBRE_PRODUCTO)
    .optional()
    .notEmpty()
    .withMessage(errorMessages.NOMBRE_PRODUCTO_OBLIGATORIO)
    .isString()
    .withMessage(errorMessages.NOMBRE_PRODUCTO_STRING),
  check(SchemaFields.STOCK_PRODUCTO)
    .optional()
    .notEmpty()
    .withMessage(errorMessages.STOCK_PRODUCTO_OBLIGATORIO)
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage(errorMessages.STOCK_PRODUCTO_FLOAT),
  check(SchemaFields.COSTO_PRODUCTO)
    .optional()
    .notEmpty()
    .withMessage(errorMessages.COSTO_PRODUCTO_OBLIGATORIO)
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage(errorMessages.COSTO_PRODUCTO_FLOAT),
  check(SchemaFields.PRECIO_PRODUCTO)
    .optional()
    .notEmpty()
    .withMessage(errorMessages.PRECIO_PRODUCTO_OBLIGATORIO)
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage(errorMessages.PRECIO_PRODUCTO_FLOAT),
  check(SchemaFields.ID_CATEGORIA)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_CATEGORIA_INT),
  check(SchemaFields.ID_ESTADO)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_ESTADO_INT),
  check(SchemaFields.ID_MARCA)
    .optional()
    .isInt({ min: 1 })
    .withMessage(errorMessages.ID_MARCA_INT),
];

const deleteProductoValidationRules = validate([
  check(SchemaFields.ID).isInt({ min: 1 }).withMessage(errorMessages.ID_INT),
]);

const productoValidator = {
  getProductoByIDValidationRules,
  createProductoValidationRules: validate(createProductoValidationRules),
  updateProductoValidationRules: validate(updateProductoValidationRules),
  deleteProductoValidationRules,
};

export default productoValidator;
