import { customQuery } from "../utils/customQuery";
const useTokenData = () => {
  return customQuery("tokenData", "/api/usuarios/datos-token");
};

export { useTokenData };
