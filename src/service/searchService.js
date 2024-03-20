import useAxios from "../hooks/useAxios";

const useSearchService = () => {
  const { api } = useAxios();

  const searchHandler = async ({ queryKey }) => {
    console.log("hit");
    const url = queryKey[1]?.query ? `/search?q=${queryKey[1]?.query}` : null;
    console.log("search ", {queryKey, url}, );
    const response = url ? await api.get(url) : null;
    return response?.data;
  };

  return { searchHandler };
};

export default useSearchService;
