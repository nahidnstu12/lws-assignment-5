import axios from "axios";
import { useEffect } from "react";
import { api } from "../utils/axios";
import { getBrowserCookie, setBrowserCookie } from "../utils/cookieInstance";
import { constant } from "../utils/queryKey";
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  // console.log({ authToken: auth?.accessToken });

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken =
          auth?.accessToken || getBrowserCookie(constant.Auth_Token) || "";
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 403 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const oldRefreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_URI}/auth/refresh-token`,
              { refreshToken: oldRefreshToken }
            );
            const { accessToken } = response.data;

            console.log(`New Token: ${accessToken}`);
            setBrowserCookie(constant.Auth_Token, accessToken);
            setAuth({ ...auth, accessToken });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.token?.accessToken, auth?.token?.refreshToken]);

  return { api };
};

export default useAxios;
