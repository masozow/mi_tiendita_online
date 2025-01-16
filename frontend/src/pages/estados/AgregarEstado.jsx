import FormEstados from "./FormEstados";

const AgregarEstado = () => {
  return (
    <FormEstados
      data={null}
      URL="/api/estados"
      httpMethod="POST"
      submitMessage="Crear Estado"
    />
  );
};

export default AgregarEstado;
