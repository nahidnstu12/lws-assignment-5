import React from "react";
import { Link } from "react-router-dom";

export default function SidebarCard({ sectioTitle }) {
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        {sectioTitle}
      </h3>
      <ul className="space-y-5 my-5">
        {[...Array(5)].map((_, i) => (
          <li key={i}>
            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
              How to Auto Deploy a Next.js App on Ubuntu from GitHub
            </h3>
            <p className="text-slate-600 text-sm">
              by
              <Link to="/me">Saad Hasan</Link>
              <span>·</span> 100 Likes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
