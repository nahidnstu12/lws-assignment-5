import React from "react";
import BlogCard from "./BlogCard";
import SidebarCard from "./SidebarCard";

export default function Bloglist() {
  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="space-y-3 md:col-span-5">
              {[...Array(5)].map((it, index) => (
                <BlogCard />
              ))}
            </div>
            <div className="md:col-span-2 h-full w-full space-y-5">
              <SidebarCard sectioTitle={"Most Popular 👍️"} />
              <SidebarCard sectioTitle={"Your Favourites ❤️"} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}