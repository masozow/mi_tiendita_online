import { useMutation } from "react-query";
import axios from "axios";

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error en axios: ", error.response?.data);
    if (error?.response) {
      return Promise.reject(error.response?.data); // Capturar errores del servidor
    } else {
      return Promise.reject({ message: "An unknown error occurred" });
    }
  }
);

const useLoginMutation = () => {
  const setError = (error) => {
    console.error("Error global:", error);
  };

  const loginMutation = useMutation(
    async (data) => {
      const response = await axios.post("/api/usuarios/login", data);
      return response.data;
    },
    {
      onError: (error) => {
        setError(error);
      },
    }
  );

  return loginMutation;
};

export { useLoginMutation };
