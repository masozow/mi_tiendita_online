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
  codigoProducto: yup.string().required("El código del producto es requerido"),
  nombreProducto: yup.string().required("El nombre del producto es requerido"),
  stockProducto: yup.number().required("El stock del producto es requerido"),
  // .test(
  //   "is-decimal",
  //   "Debe tener dos decimales",
  //   (value) => value % 1 === 0 && value.toString().split(".")[1].length <= 2
  // ),
  costoProducto: yup.number().required("El costo del producto es requerido"),
  // .test(
  //   "is-decimal",
  //   "Debe tener dos decimales",
  //   (value) => value % 1 === 0 && value.toString().split(".")[1].length <= 2
  // ),
  precioProducto: yup.number().required("El precio del producto es requerido"),
  // .test(
  //   "is-decimal",
  //   "Debe tener dos decimales",
  //   (value) => value % 1 === 0 && value.toString().split(".")[1].length <= 2
  // ),
  idCategoria: yup.number().required("La categoría es requerida"),
  idMarca: yup.number().required("La marca es requerida"),
  idEstado: yup.number().required("El estado es requerido"),
  fotoProducto: yup.mixed().nullable(),
});
const schemas = {
  loginSchema,
  ordenSchema,
  productoSchema,
};

export default schemas;
