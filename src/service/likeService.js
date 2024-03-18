import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

const useLikesService = () => {
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
    mutationFn: (id) => api.post(`/blogs/${id}/like`),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["likes", data?.data?.blog?.id]);
      if (data?.data?.isLiked) {
        toast.success("You like this blog!");
      } else {
        toast.success("You unlike this blog!");
      }
    },
  });

  return { getList, toggle };
};

export default useLikesService;
