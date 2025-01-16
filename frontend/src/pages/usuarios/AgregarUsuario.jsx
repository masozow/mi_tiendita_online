import FormUsuarios from "./FormUsuarios";

const AgregarUsuario = () => {
  return (
    <FormUsuarios
      data={null}
      URL="/api/usuarios" //Dentro del formulario se cambia por la URL correcta, porque depende del rol
      httpMethod="POST"
      submitMessage="Crear Usuario"
    />
  );
};

export default AgregarUsuario;
