import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const useCommentService = () => {
  const { api } = useAxios();
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: ({ id, body }) => api.post(`/blogs/${id}/comment`, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments", data?.data?.blog?.id]);
    },
  });

  const remove = useMutation({
    mutationFn: ({ id, cid }) => api.delete(`/blogs/${id}/comment/${cid}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments", data?.data?.blog?.id]);
    },
  });

  return { create, remove };
};

export default useCommentService;
