import FormProductos from "./FormProductos";

const AgregarProducto = () => {
  return (
    <FormProductos
      data={null}
      URL="/api/productos"
      httpMethod="POST"
      submitMessage="Crear Producto"
    />
  );
};

export default AgregarProducto;
