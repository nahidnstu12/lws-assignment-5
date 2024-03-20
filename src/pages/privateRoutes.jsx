import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchComponent from "../components/SearchComponent";
import { useSearch } from "../context/searchContext";
import { useAuth } from "../hooks/useAuth";
import { getBrowserCookie } from "../utils/cookieInstance";
import { constant } from "../utils/queryKey";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  const { setIsOpenSearch, isOpenSearch } = useSearch();

  return (
    <>
      {auth?.accessToken || getBrowserCookie(constant.Auth_Token) ? (
        <main className="relative">
          <Header />
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
          <Footer />
          {isOpenSearch && <SearchComponent handleClose={setIsOpenSearch} />}
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
