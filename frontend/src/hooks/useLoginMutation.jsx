import { useMutation } from "react-query";
import axios from "../utils/axiosInterceptors.js";

const useCustomMutation = (URL, httpMethod) => {
  const setError = (error) => {
    console.error("Error global en custom mutation:", error);
  };

  const loginMutation = useMutation(
    async (data) => {
      let response;
      switch (httpMethod) {
        case "POST":
          response = await axios.post(URL, data, {
            withCredentials: true,
          });
          break;
        case "PUT":
          response = await axios.put(URL, data, {
            withCredentials: true,
          });
          break;
        case "PATCH":
          response = await axios.patch(URL, data, {
            withCredentials: true,
          });
          break;
        case "DELETE":
          response = await axios.delete(URL, {
            withCredentials: true,
          });
          break;
        default:
          throw new Error(`httpMethod ${httpMethod} no soportado`);
      }
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

export { useCustomMutation };
