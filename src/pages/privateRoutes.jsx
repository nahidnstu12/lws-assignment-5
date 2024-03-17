import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { getBrowserCookie } from "../utils/cookieInstance";
import { constant } from "../utils/queryKey";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);
  console.log("PrivateRoutes:", auth);



  return (
    <>
      {auth?.accessToken || getBrowserCookie(constant.Auth_Token) ? (
        <>
          <Header />
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
