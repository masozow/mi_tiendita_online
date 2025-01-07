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
  costoProducto: yup.number().required("El costo del producto es requerido"),
  precioProducto: yup.number().required("El precio del producto es requerido"),
  idCategoria: yup.number().required("La categoría es requerida"),
  idMarca: yup.number().required("La marca es requerida"),
  idEstado: yup.number().required("El estado es requerido"),
  fotoProducto: yup.mixed().nullable(),
});

const marcaSchema = yup.object().shape({
  nombre: yup.string().required("El nombre de la marca es requerido"),
  idEstado: yup.number().required("El estado es requerido"),
});

const categoriaSchema = yup.object().shape({
  nombre: yup.string().required("El nombre de la categoría es requerido"),
  idEstado: yup.number().required("El estado es requerido"),
});

const estadoSchema = yup.object().shape({
  nombre: yup.string().required("El nombre del estado es requerido"),
  estadoUsable: yup.boolean().required("El estado usable es requerido"),
});

const schemas = {
  loginSchema,
  ordenSchema,
  productoSchema,
  marcaSchema,
  categoriaSchema,
  estadoSchema,
};

export default schemas;
