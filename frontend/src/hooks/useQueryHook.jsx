import { customQuery } from "../utils/customQuery";
const useQueryHook = (queryKey, URL) => {
  return customQuery(queryKey, URL);
};

export { useQueryHook };
