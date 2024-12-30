import * as yup from "yup";
import { es } from "yup-locales";
yup.setLocale(es);
const loginSchema = yup.object().shape({
  correo: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const schemas = {
  loginSchema,
};

export default schemas;
