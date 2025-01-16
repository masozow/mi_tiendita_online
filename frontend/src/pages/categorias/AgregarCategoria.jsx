import FormCategorias from "./FormCategorias";

const AgregarCategoria = () => {
  return (
    <FormCategorias
      data={null}
      URL="/api/categorias"
      httpMethod="POST"
      submitMessage="Crear Categoría"
    />
  );
};

export default AgregarCategoria;
