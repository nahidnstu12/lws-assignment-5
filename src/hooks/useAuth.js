import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
  const { auth } = useContext(AuthContext);
  // useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  console.log("useAuth hook:", auth);
  return useContext(AuthContext);
};
