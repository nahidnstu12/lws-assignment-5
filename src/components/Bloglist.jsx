import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import useServiceHook from "../utils/blogService";
import { key } from "../utils/queryKey";
import BlogCard from "./BlogCard";
import SidebarCard from "./SidebarCard";

export default function Bloglist() {
  const auth = useAuth();
  const id = "4321b782f360f58c8c89";
  const { getList, getPopularList, getfavoriteList } = useServiceHook();
  const {
    data: blogItems,
    error,
    isLoading,
  } = useQuery({
    queryKey: [key.blogs, { page: 1, limit: 10 }],
    queryFn: getList,
  });

  const {
    data: popularBlogs,
    error: popularBlogError,
    isLoading: popularBloagLoading,
  } = useQuery({
    queryKey: ["popular", { page: 1, limit: 10 }],
    queryFn: getPopularList,
  });

  const {
    data: favBlogs,
    error: favBlogError,
    isLoading: favBloagLoading,
  } = useQuery({
    queryKey: ["favorites", { page: 1, limit: 10 }],
    queryFn: getfavoriteList,
  });

  // console.log({ blogItems, popularBlogs,favBlogs, isLoading, error });
  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="space-y-3 md:col-span-5">
              {blogItems?.blogs?.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="md:col-span-2 h-full w-full space-y-5">
              <SidebarCard
                sectioTitle={"Most Popular 👍️"}
                blogs={popularBlogs?.blogs || []}
              />
              <SidebarCard
                sectioTitle={"Your Favourites ❤️"}
                blogs={favBlogs?.blogs || []}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
