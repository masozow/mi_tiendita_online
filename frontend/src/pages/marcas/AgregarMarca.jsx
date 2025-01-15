import FormMarcas from "./FormMarcas";

const AgregarMarca = () => {
  return (
    <FormMarcas
      data={null}
      URL="/api/marcas"
      httpMethod="POST"
      submitMessage="Crear Marca"
    />
  );
};

export default AgregarMarca;
