import { check } from "express-validator";
import validate from "../../utilities/validate.js";

const getUsuarioByIDValidationRules = validate([
  check("id").isInt().withMessage("ID debe ser un número entero"),
]);

const createUsuarioValidationRules = validate([
  check("correo").isEmail().withMessage("Correo electrónico no es válido"),
  check("nombre").notEmpty().withMessage("Nombre es obligatorio"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  check("telefono").notEmpty().withMessage("Teléfono es obligatorio"),
  check("fechaNacimiento")
    .isDate()
    .withMessage("Fecha de nacimiento no es válida"),
  check("idEstado")
    .isInt()
    .withMessage("ID del estado debe ser un número entero"),
  check("idRol").isInt().withMessage("ID del rol debe ser un número entero"),
]);

const updateUsuarioValidationRules = validate([
  check("id").isInt().withMessage("ID debe ser un número entero"),
  check("correo")
    .optional()
    .isEmail()
    .withMessage("Correo electrónico no es válido"),
  check("nombre").optional().notEmpty().withMessage("Nombre es obligatorio"),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  check("telefono")
    .optional()
    .notEmpty()
    .withMessage("Teléfono es obligatorio"),
  check("fechaNacimiento")
    .optional()
    .isDate()
    .withMessage("Fecha de nacimiento no es válida"),
  check("idEstado")
    .optional()
    .isInt()
    .withMessage("ID del estado debe ser un número entero"),
  check("idRol")
    .optional()
    .isInt()
    .withMessage("ID del rol debe ser un número entero"),
]);

const deleteUsuarioValidationRules = validate([
  check("id").isInt().withMessage("ID debe ser un número entero"),
]);

const loginUsuarioValidationRules = validate([
  check("correo").isEmail().withMessage("Correo electrónico no es válido"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
]);

const usuarioValidator = {
  getUsuarioByIDValidationRules,
  createUsuarioValidationRules,
  updateUsuarioValidationRules,
  deleteUsuarioValidationRules,
  loginUsuarioValidationRules,
};

export default usuarioValidator;
