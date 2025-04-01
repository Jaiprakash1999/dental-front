import { debounce } from "lodash";
import { useCallback, useState } from "react";

const useDebounce = () => {
  const [query, setQuery] = useState("");

  const request = debounce((value) => {
    setQuery(value);
  }, 500);
  const debounceQuery = useCallback((value) => request(value), []);
  return { query, debounceQuery };
};
export default useDebounce;
