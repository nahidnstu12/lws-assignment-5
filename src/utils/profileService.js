import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const useProfileService = () => {
  const { api } = useAxios();
  const queryClient = useQueryClient();

  const getProfile = async ({ queryKey }) => {
    const response = await api.get(`/profile/${queryKey[1]}`);
    return response.data;
  };
  const updateProfile = useMutation({
    mutationFn: (body) => api.patch(`/profile`, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["profile", data?.data?.profile?.id]);
    },
  });
  const updateAvatar = useMutation({
    mutationFn: (body) => api.post(`/profile/avatar`, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["profile", data?.data?.profile?.id]);
    },
  });

  return { getProfile, updateProfile, updateAvatar };
};

export default useProfileService;
