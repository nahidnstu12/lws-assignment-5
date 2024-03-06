import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { key } from "../utils/queryKey";
import useServiceHook from "../utils/blogService";

export default function Bloglist() {
  const id = "4321b782f360f58c8c89";
  const { getList, getOne, update, create, remove } = useServiceHook();
  const {
    data: blogItems,
    error,
    isLoading,
  } = useQuery({
    queryKey: [key.blogs, {page: 1, limit: 2}],
    queryFn: getList,
  });
  const isSubmited = false;
  const blogData = {
    title: "Learn React",
    content: "lorem10",
    tags: "programming, algorithm, prototype, javascript",
  };

  useEffect(() => {
    if (isSubmited) {
      remove.mutate(id);
    }
  }, []);

  // console.log({ blogItems, isLoading, error });
  return (
    <main>
      {/* <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="space-y-3 md:col-span-5">
              {[...Array(5)].map((it, index) => (
                <BlogCard key={index}/>
              ))}
            </div>
            <div className="md:col-span-2 h-full w-full space-y-5">
              <SidebarCard sectioTitle={"Most Popular 👍️"} />
              <SidebarCard sectioTitle={"Your Favourites ❤️"} />
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
