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
  detalle: yup.array().of(
    yup.object().shape({
      cantidad: yup.number().required(),
      precio: yup.number().required(),
      subtotal: yup.number().required(),
      idProducto: yup.number().required(),
    })
  ),
});

const schemas = {
  loginSchema,
  ordenSchema,
};

export default schemas;
