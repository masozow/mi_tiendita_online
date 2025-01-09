import { useQuery } from "react-query";
import axios from "../utils/axiosInterceptors.js";

const useDynamicQuery = (queryKey, url) => {
  return useQuery(
    queryKey,
    async () => {
      const response = await axios.get(url, { withCredentials: true });
      return response.data;
    },
    {
      enabled: !!queryKey && !!url,
    }
  );
};

export { useDynamicQuery };
