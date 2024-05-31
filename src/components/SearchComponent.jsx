import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../context/searchContext";
import useSearchService from "../service/searchService";
import { debounce, previewImage, truncatedContent } from "../utils/helpers";

export default function SearchComponent({ handleClose }) {
  const { searchHandler } = useSearchService();
  const [searchQ, setSearchQ] = useState("");
  const searchRef = useRef();

  const {
    data: blogs,
    error: blogError,
    isLoading: isBloagLoading,
  } = useQuery({
    queryKey: ["search", { query: searchQ }],
    queryFn: searchHandler,
  });

  const handleSearch = () => {
    setSearchQ(searchRef.current.value);
  };
  const debouncedSearch = useCallback(debounce(handleSearch, 500), [
    handleSearch,
  ]);

  return (
    <div className="">
      <section className="absolute left-0 top-0 w-full h-full  grid pt-36 bg-slate-800/50 backdrop-blur-sm z-50">
        <div className="relative w-6/12 h-[630px] mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
          <div>
            <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
              Search for Your Desire Blogs
            </h3>
            <input
              ref={searchRef}
              onChange={debouncedSearch}
              type="text"
              placeholder="Start Typing to Search"
              className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
            />
          </div>
          {blogs?.data?.length > 0 && (
            <div className="">
              <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
              {isBloagLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                  {blogs?.data?.map((blog) => (
                    <BlogCard blog={blog} key={blog?.id} />
                  ))}
                </div>
              )}
            </div>
          )}
          <div onClick={() => handleClose(false)}>
            <img
              src="/src/assets/icons/close.svg"
              alt="Close"
              className="absolute right-2 top-2 cursor-pointer w-8 h-8"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const BlogCard = ({ blog }) => {
  const { setIsOpenSearch } = useSearch();
  return (
    <Link
      to={`/blog/${blog?.id}`}
      onClick={() => {
        setIsOpenSearch(false);
      }}
    >
      <div className="flex gap-6 py-2">
        <img
          className="h-28 object-contain"
          src={previewImage("blog", blog?.thumbnail)}
          alt=""
        />
        <div className="mt-2">
          <h3 className="text-slate-300 text-xl font-bold">{blog?.title}</h3>
          <p className="mb-6 text-sm text-slate-500 mt-1">
            {truncatedContent(blog?.content)}
          </p>
        </div>
      </div>
    </Link>
  );
};
