import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./axios";
import { key } from "./queryKey";

const useBlogService = () => {
  const queryClient = useQueryClient();
  const baseURL = `${import.meta.env.VITE_API_KEY}/blogs`;

  const getList = async ({ queryKey }) => {
    const url =
      queryKey[1]?.page && queryKey[1]?.limit
        ? `${baseURL}?page=${queryKey[1]?.page}&limit=${queryKey[1]?.limit}`
        : baseURL;

    const response = await api.get(url);
    return response.data;
  };
  const getPopularList = async () => {
    const response = await api.get(`${baseURL}/popular`);
    return response.data;
  };
  const getOne = async ({ queryKey }) => {
    const response = await api.get(`${baseURL}/${queryKey[1]}`);
    return response.data;
  };

  const create = useMutation({
    mutationFn: (body) => api.post(baseURL, body),
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", data, variables, context);
      queryClient.invalidateQueries([key.blogs]);
    },
    onMutate: (variables) => {
      console.log("onMtate:", variables);
      return { greeting: "Say hello" };
    },
  });

  const update = useMutation({
    mutationFn: (id, body) => api.patch(`${baseURL}/${id}`, body),
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", data, variables, context);
      queryClient.invalidateQueries([key.blogs]);
    },
    onMutate: (variables) => {
      console.log("onMtate:", variables);
      return { greeting: "Say hello" };
    },
  });

  const remove = useMutation({
    mutationFn: (id) => api.delete(`${baseURL}/${id}`),
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", data, variables, context);
      queryClient.invalidateQueries([key.blogs]);
    },
  });

  return { getList, getOne, getPopularList, create, update, remove };
};

export default useBlogService;
