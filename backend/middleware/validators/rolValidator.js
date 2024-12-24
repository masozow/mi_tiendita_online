import { check } from "express-validator";
import validate from "../../utilities/validate.js";

const getRolByIDValidationRules = validate([
  check("id").isInt().withMessage("ID debe ser un número entero"),
]);

const createRolValidationRules = validate([
  check("nombre").notEmpty().withMessage("Nombre es obligatorio"),
]);

const updateRolValidationRules = validate([
  check("id").isInt().withMessage("ID debe ser un número entero"),
  check("nombre").optional().notEmpty().withMessage("Nombre es obligatorio"),
  check("idEstado")
    .optional()
    .isInt()
    .withMessage("ID del estado debe ser un número entero"),
]);

const deleteRolValidationRules = validate([
  check("id").isInt().withMessage("ID debe ser un número entero"),
]);

const rolValidator = {
  getRolByIDValidationRules,
  createRolValidationRules,
  updateRolValidationRules,
  deleteRolValidationRules,
};

export default rolValidator;
