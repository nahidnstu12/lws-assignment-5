import React from "react";
import { Link } from "react-router-dom";

export default function SidebarCard({ sectioTitle, blogs }) {
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        {sectioTitle}
      </h3>
      <ul className="space-y-5 my-5">
        {blogs?.length === 0 && <p>No data found</p>}
        {blogs?.map((blog) => (
          <li key={blog.id}>
            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
              {blog?.title}
            </h3>
            <p className="text-slate-600 text-sm">
              by
              <Link to={`/profile/${blog?.author?.id}`}>
                {blog?.author?.firstName} {blog?.author?.lastName}
              </Link>
              <span>·</span> {blog?.likes?.length} Likes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
