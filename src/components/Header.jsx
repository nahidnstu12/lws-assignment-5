import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { auth } = useAuth();
  const isAuthed = auth?.token?.accessToken;
  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/">
            <img className="w-32" src="/src/assets/logo.svg" alt="lws" />
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
                <li>
                  <Link
                    to="#"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img src="/src/assets/icons/search.svg" alt="Search" />
                    <span>Search</span>
                  </Link>
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
                <div className="avater-img bg-orange-600 text-white">
                  <span className="">S</span>
                </div>

                <Link to={`/profile/${auth?.user?.id}`}>
                  <span className="text-white ml-2">
                    {auth?.user?.firstName} {auth?.user?.lastName}
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
