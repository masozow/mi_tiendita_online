import yup from "yup";

const loginSchema = yup.object().shape({
  correo: yup
    .string()
    .email("Correo no válido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const schema = {
  loginSchema,
};

export default schema;
