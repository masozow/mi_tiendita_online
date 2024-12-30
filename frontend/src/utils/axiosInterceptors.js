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
      return Promise.reject(error.response?.data);
    } else {
      return Promise.reject({ message: "Ocurrió un error desconocido" });
    }
  }
);

export default axios;
