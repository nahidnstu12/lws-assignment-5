import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";


const PrivateRoutes = () => {
    const { auth } = useAuth();
    console.log("PrivateRoutes:", auth);

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
