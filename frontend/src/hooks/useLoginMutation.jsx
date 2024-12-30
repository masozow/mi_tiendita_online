import { useMutation } from "react-query";
import axios from "../utils/axiosInterceptors.js";

const useLoginMutation = () => {
  const setError = (error) => {
    console.error("Error global:", error);
  };

  const loginMutation = useMutation(
    async (data) => {
      const response = await axios.post("/api/usuarios/login", data, {
        withCredentials: true,
      });
      return response.data;
    },
    {
      onError: (error) => {
        setError(error);
        throw error;
      },
    }
  );

  return loginMutation;
};

export { useLoginMutation };
