import React from "react";
import { Link } from "react-router-dom";
import { fullName, transformedText } from "../utils/helpers";

export default function SidebarCard({ blogs, isSection }) {
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        {isSection === "favorite" ? "Your Favourites ❤️" : "Most Popular 👍️"}
      </h3>
      <ul className="space-y-5 my-5">
        {blogs?.length === 0 && <p>No data found</p>}
        {blogs?.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog?.id}`}>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {blog?.title}
              </h3>
            </Link>
            {blog?.author?.firstName && (
              <p className="text-slate-600 text-sm">
                by
                <Link to={`/profile/${blog?.author?.id}`}>
                  {fullName(blog?.author?.firstName, blog?.author?.lastName)}
                </Link>
                <span>·</span>
                {transformedText("Like", blog?.likes?.length)}
              </p>
            )}
            {blog?.tags && isSection === "favorite" && (
              <p class="text-slate-600 text-sm">
                {blog?.tags
                  ?.split(",")
                  .map((item) => `#${item}`)
                  .join(",")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
