import { createContext, useEffect, useState } from "react";
import { getUser } from "../utils/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    if (window) {
      console.log("call 1");
      const loadUser = getUser(); //this is from localstorge data
      if (loadUser?.token?.accessToken) {
        setAuth(loadUser);
      }
    }
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
