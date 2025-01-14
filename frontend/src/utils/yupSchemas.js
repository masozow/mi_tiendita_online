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
    .test(
      "len",
      "El teléfono debe tener exactamente 8 dígitos",
      (val) => val.toString().length === 8
    ),
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
const usuarioClienteSchema = yup.object().shape({
  correo: yup.string().email().required("El correo es requerido"),
  nombre: yup.string().required("El nombre es requerido"),
  password: yup
    .string()
    .required()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmarContrasena: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  telefono: yup
    .number()
    .required("El teléfono es requerido")
    .test(
      "len",
      "El teléfono debe tener exactamente 8 dígitos",
      (val) => val.toString().length === 8
    ),
  fechaNacimiento: yup.date().required("La fecha de nacimiento es requerida"),
  idEstado: yup
    .number()
    .integer()
    .positive()
    .required("El estado es requerido"),
  idRol: yup.number().required("El rol es requerido"),
  razonSocial: yup.string().required("La razón social es requerida"),
  direccion: yup.string().required("La dirección es requerida"),
});

const usuarioOperadorSchema = yup.object().shape({
  correo: yup.string().email().required("El correo es requerido"),
  nombre: yup.string().required("El nombre es requerido"),
  password: yup.string().required("La contraseña es requerida"),
  confirmarContrasena: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("La confirmación de la contraseña es requerida"),
  telefono: yup
    .number()
    .required("El teléfono es requerido")
    .test(
      "len",
      "El teléfono debe tener exactamente 8 dígitos",
      (val) => val.toString().length === 8
    ),
  fechaNacimiento: yup.date().required("La fecha de nacimiento es requerida"),
  idEstado: yup.number().positive().required("El estado es requerido"),
  idRol: yup.number().required("El rol es requerido"),
});
const schemas = {
  loginSchema,
  ordenSchema,
  productoSchema,
  marcaSchema,
  categoriaSchema,
  estadoSchema,
  usuarioClienteSchema,
  usuarioOperadorSchema,
};

export default schemas;
