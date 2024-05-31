import React from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../context/searchContext";
import { useAuth } from "../hooks/useAuth";
import { getBrowserCookie, removeBrowserCookie } from "../utils/cookieInstance";
import { firstAvatar, fullName, previewImage } from "../utils/helpers";
import { constant } from "../utils/queryKey";
import logo from "/src/assets/logo.svg";
import search from "/src/assets/icons/search.svg";

export default function Header() {
  const { auth, setAuth } = useAuth();
  const isAuthed = auth?.accessToken || getBrowserCookie(constant.Auth_Token); //temporarily
  const authUser = auth?.user || getBrowserCookie(constant.User_Data); //temporarily
  const { setIsOpenSearch } = useSearch();
  const handleLogout = () => {
    setAuth({});
    removeBrowserCookie(constant.Auth_Token);
    removeBrowserCookie(constant.Refresh_Token);
    removeBrowserCookie(constant.User_Data);
  };
  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>

        <div>
          <ul className="flex items-center space-x-5">
            {isAuthed && (
              <>
                <li>
                  <Link
                    to="/write-blog"
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Write
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setIsOpenSearch(true);
                  }}
                >
                  <Link
                    to="#"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img src={search} alt="Search" />
                    <span>Search</span>
                  </Link>
                </li>
                <li
                  className="text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            )}
            {!isAuthed ? (
              <li>
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="flex items-center">
                {authUser?.avatar ? (
                  <img
                    className="avater-img"
                    src={previewImage("avatar", authUser?.avatar)}
                    alt={authUser?.firstName}
                  />
                ) : (
                  <div className="avater-img bg-orange-600 text-white">
                    <span className="">{firstAvatar(authUser?.firstName)}</span>
                  </div>
                )}

                <Link to={`/profile/${authUser?.id}`}>
                  <span className="text-white ml-2">
                    {fullName(authUser?.firstName, authUser?.lastName)}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
