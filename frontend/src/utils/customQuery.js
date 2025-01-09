import { useQuery } from "react-query";
import axios from "./axiosInterceptors.js";

const customQuery = (queryKey, url) => {
  return useQuery(queryKey, async () => {
    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  });
};

export { customQuery };
