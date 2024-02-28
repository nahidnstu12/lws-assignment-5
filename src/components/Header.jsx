import React from "react";

export default function Header() {
  return (
    <header>
      <nav class="container">
        <div>
          <a href="./index.html">
            <img class="w-32" src="./assets/logo.svg" alt="lws" />
          </a>
        </div>

        <div>
          <ul class="flex items-center space-x-5">
            <li>
              <a
                href="./createBlog.html"
                class="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </a>
            </li>
            <li>
              <a
                href="./search.html"
                class="flex items-center gap-2 cursor-pointer"
              >
                <img src="./assets/icons/search.svg" alt="Search" />
                <span>Search</span>
              </a>
            </li>
            <li>
              <a
                href="./login.html"
                class="text-white/50 hover:text-white transition-all duration-200"
              >
                Login
              </a>
            </li>
            <li class="flex items-center">
              <div class="avater-img bg-orange-600 text-white">
                <span class="">S</span>
              </div>

              <a href="./profile.html">
                <span class="text-white ml-2">Saad Hasan</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
