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

const ordenSchema = yup.object().shape({
  nombre: yup.string().required(),
  direccion: yup.string().required(),
  telefono: yup
    .number()
    .required()
    .max(99999999, "El teléfono debe tener como máximo 8 dígitos"),
  correo: yup.string().email().required(),
  fechaEntrega: yup.date().required(),
  total: yup.number().required(),
  idEstado: yup.number().required(),
  idCliente: yup.number().required(),
});

const productoSchema = yup.object().shape({
  codigoProducto: yup.string().required(),
  nombreProducto: yup.string().required(),
  stockProducto: yup
    .number()
    .required()
    .test(
      "is-decimal",
      "Debe tener dos decimales",
      (value) => value % 1 === 0 && value.toString().split(".")[1].length <= 2
    ),
  costoProducto: yup
    .number()
    .required()
    .test(
      "is-decimal",
      "Debe tener dos decimales",
      (value) => value % 1 === 0 && value.toString().split(".")[1].length <= 2
    ),
  precioProducto: yup
    .number()
    .required()
    .test(
      "is-decimal",
      "Debe tener dos decimales",
      (value) => value % 1 === 0 && value.toString().split(".")[1].length <= 2
    ),
  idCategoria: yup.number().required(),
  idMarca: yup.number().required(),
  idEstado: yup.number().required(),
  fotoProducto: yup.mixed().required(),
});
const schemas = {
  loginSchema,
  ordenSchema,
  productoSchema,
};

export default schemas;
