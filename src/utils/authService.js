import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../hooks/useAxios";
import { removeBrowserCookie, setBrowserCookie } from "./cookieInstance";
import { constant } from "./queryKey";

const useAuthService = () => {
  const { api } = useAxios();
  const baseURL = `/auth`;
  const navigate = useNavigate();

  const register = useMutation({
    mutationFn: (body) => api.post(`${baseURL}/register`, body),
    onSuccess: (data) => {
      setBrowserCookie(constant.Auth_Token, data.data.token.accessToken);
      setBrowserCookie(constant.Refresh_Token, data.data.token.refreshToken);
      setBrowserCookie(constant.User_Data, data.data.user);
      navigate("/");
    },
    onError: (error) => {
      console.error("register err: ", error);
      removeBrowserCookie(constant.Auth_Token);
      removeBrowserCookie(constant.Refresh_Token);
      removeBrowserCookie(constant.User_Data);
      toast.success(error.response.data.error);
    },
    //
  });

  const login = useMutation({
    mutationFn: (body) => api.post(`${baseURL}/login`, body),
    onSuccess: (data) => {
      setBrowserCookie(constant.Auth_Token, data?.data?.token?.accessToken);
      setBrowserCookie(constant.Refresh_Token, data?.data?.token?.refreshToken);
      setBrowserCookie(constant.User_Data, data?.data?.user); //maybe move localstorage
      navigate("/");
    },
    onError: (error) => {
      console.error("login err=>", error);
      removeBrowserCookie(constant.Auth_Token);
      removeBrowserCookie(constant.Refresh_Token);
      removeBrowserCookie(constant.User_Data);
      toast.success(error.response.data.error);
    },
  });

  return { register, login };
};

export default useAuthService;
