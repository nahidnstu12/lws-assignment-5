import { createContext, useEffect, useState } from "react";
import { getBrowserCookie } from "../utils/cookieInstance";
import { constant } from "../utils/queryKey";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authtoken = getBrowserCookie(constant.Auth_Token);
    const refreshToken = getBrowserCookie(constant.Refresh_Token);
    const authUser = getBrowserCookie(constant.User_Data);

    if (authtoken) {
      // console.log("load user from cookie", {
      //   authtoken,
      //   refreshToken,
      //   authUser,
      // });
      setAuth((prev) => ({
        ...prev,
        accessToken: authtoken,
        refreshToken,
        user: authUser,
      }));
    }
  }, []);

  console.log("AuthContext:", auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
