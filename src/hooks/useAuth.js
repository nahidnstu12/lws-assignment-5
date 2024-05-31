import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { getBrowserCookie } from "../utils/cookieInstance";
import { constant } from "../utils/queryKey";

export const useAuth = () => {
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    const authtoken = getBrowserCookie(constant.Auth_Token);
    const refreshToken = getBrowserCookie(constant.Refresh_Token);
    const authUser = getBrowserCookie(constant.User_Data);

    if (authtoken) {
      setAuth((prev) => ({
        ...prev,
        accessToken: authtoken,
        refreshToken,
        user: authUser,
      }));
    }
  }, []);
  return useContext(AuthContext);
};
