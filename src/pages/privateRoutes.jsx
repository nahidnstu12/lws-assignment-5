import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);
  console.log("PrivateRoutes:", auth);

  // useEffect(() => {
  //   console.log("after mount");
  //   setAuthState(auth?.token?.accessToken);
  // }, [auth?.token?.accessToken]);

  //  useEffect(() => {
  //    auth?.token?.accessToken || authState  ;
  //  }, [auth?.token?.accessToken]);

  return (
    <>
      {auth?.token?.accessToken ? (
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
