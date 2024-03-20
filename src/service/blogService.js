import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../hooks/useAxios";
import { key } from "../utils/queryKey";

const useBlogService = () => {
  const { api } = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const baseURL = `/blogs`;

  const getList = async ({ queryKey }) => {
    const url =
      queryKey[1]?.page && queryKey[1]?.limit
        ? `${baseURL}?page=${queryKey[1]?.page}&limit=${queryKey[1]?.limit}`
        : baseURL;

    const response = await api.get(url);
    return response.data;
  };
  const getPopularList = async ({ queryKey }) => {
    const url =
      queryKey[1]?.page && queryKey[1]?.limit
        ? `/blogs/popular?page=${queryKey[1]?.page}&limit=${queryKey[1]?.limit}`
        : "/blogs/popular";
    const response = await api.get(url);
    return response.data;
  };
  const getfavoriteList = async ({ queryKey }) => {
    const url =
      queryKey[1]?.page && queryKey[1]?.limit
        ? `${baseURL}/favourites?page=${queryKey[1]?.page}&limit=${queryKey[1]?.limit}`
        : "/blogs/favourites";
    const response = await api.get(url);
    return response.data;
  };
  const getOne = async ({ queryKey }) => {
    const response = await api.get(`${baseURL}/${queryKey[1]}`);
    return response.data;
  };

  const create = useMutation({
    mutationFn: (body) => api.post(baseURL, body),
    onSuccess: (data) => {
      // console.log("onSuccess", data, data?.data?.blog?.id);
      queryClient.invalidateQueries([key.blogs]);
      navigate(`/blog/${data?.data?.blog?.id}`);
      toast.success("Blog created successfully");
    },
  });

  const update = useMutation({
    mutationFn: ({id, body}) => api.patch(`${baseURL}/${id}`, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries([key.blogs, data?.data?.blog?.id]);
      navigate(`/blog/${data?.data?.id}`);
      toast.success("Blog updated successfully");
    },
  });

  const remove = useMutation({
    mutationFn: (id) => api.delete(`${baseURL}/${id}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries([key.blogs, data?.data?.blog?.id]);
      toast.success("Blog deleted successfully");
    },
  });

  return {
    getList,
    getOne,
    getPopularList,
    getfavoriteList,
    create,
    update,
    remove,
  };
};

export default useBlogService;
