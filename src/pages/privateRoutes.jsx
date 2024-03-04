import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const PrivateRoutes = () => {
    // fake auth
  const auth = {
    authToken: true,
  };

  return (
    <>
      {auth.authToken ? (
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
