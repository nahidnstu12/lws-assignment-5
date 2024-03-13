import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { key } from "./queryKey";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const USER_LOCAL_STORAGE_KEY = "TODO_LIST-USER";
export function saveUser(user) {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser() {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

const useAuthService = () => {
  const {api} = useAxios();
  const queryClient = useQueryClient();
  const baseURL = `/auth`;
  const navigate = useNavigate();
  const {  setAuth } = useAuth();

  const register = useMutation({
    mutationFn: (body) => api.post(`${baseURL}/register`, body),
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", data, variables, context);
      queryClient.setQueryData([key.register], data.data);
      navigate("/");
    },
    //
  });

  const login = useMutation({
    mutationFn: (body) => api.post(`${baseURL}/login`, body),
    onSuccess: (data, variables, context) => {
      // console.log("onSuccess", data);
      queryClient.setQueryData([key.register], data.data);
      saveUser(data.data);
      setAuth(data.data);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      removeUser();
      setAuth({})
    },
  });

  
 

  return { register, login };
};

export default useAuthService;
