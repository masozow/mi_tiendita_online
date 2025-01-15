import { useParams } from "react-router-dom";

const ModificarMarca = () => {
  const { id } = useParams();
  return <div>ModificarMarca: {id}</div>;
};

export default ModificarMarca;
