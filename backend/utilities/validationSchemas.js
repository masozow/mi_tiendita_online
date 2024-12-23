import joi from "joi";

export const loginSchema = joi.object({
  correo: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .max(60)
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.email": "El correo electrónico no es válido.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
  password: joi.string().required(),
});
