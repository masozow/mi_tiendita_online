import { customQuery } from "../utils/customQuery";
const useQueryHook = (queryKey, URL) => {
  console.log("Query key: ", queryKey);
  console.log("URL: ", URL);
  return customQuery(queryKey, URL);
};

export { useQueryHook };
