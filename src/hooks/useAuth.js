import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import { getBrowserCookie } from "../utils/cookieInstance";
import { constant } from "../utils/queryKey";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  // useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
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
  console.log("useAuth hook:", auth);
  return useContext(AuthContext);
};
