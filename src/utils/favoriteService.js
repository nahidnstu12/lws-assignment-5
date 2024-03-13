import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const useFavoriteService = () => {
  const { api } = useAxios();
  const queryClient = useQueryClient();

  const getList = async ({ queryKey }) => {
    const url =
      queryKey[1]?.page && queryKey[1]?.limit
        ? `/blogs/favourites?page=${queryKey[1]?.page}&limit=${queryKey[1]?.limit}`
        : "/blogs/favourites";

    const response = await api.get(url);
    return response.data;
  };
  const toggle = useMutation({
    mutationFn: (id) => api.patch(`/blogs/${id}/favourite`),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["favourites", data?.data?.blog?.id]);
    },
  });

  return { getList, toggle };
};

export default useFavoriteService;
