import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useBlogService from "../service/blogService";
import {
  convertDateFormat,
  firstAvatar,
  fullName,
  previewImage,
  transformedText,
  truncatedContent,
} from "../utils/helpers";

export default function BlogCard({ blog }) {
  const { remove } = useBlogService();
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBlogDelete = () => {
    if (confirm("Are you sure to delete?")) {
      remove.mutate(blog.id);
    }
  };
  const handleBlogEdit = () => {
    navigate(`/edit-blog/${blog?.id}`);
  };

  return (
    <div className="blog-card">
      <Link to={`/blog/${blog?.id}`}>
        <img
          className="blog-thumb"
          src={previewImage("blog", blog?.thumbnail)}
          alt=""
        />
      </Link>

      <div className="mt-2 relative">
        <Link to={`/blog/${blog?.id}`}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">{blog?.title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1">
            {truncatedContent(blog?.content)}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center capitalize space-x-2">
              {blog?.author?.avatar ? (
                <img
                  className="avater-img"
                  src={previewImage("avatar", blog?.author?.avatar)}
                  alt={blog?.author?.firstName}
                />
              ) : (
                <div className="avater-img bg-indigo-600 text-white">
                  <span className="">
                    {firstAvatar(blog?.author?.firstName)}
                  </span>
                </div>
              )}

              <div>
                <h5 className="text-slate-500 text-sm">
                  <Link to={`/profile/${blog?.author?.id}`}>
                    {fullName(blog?.author?.firstName, blog?.author?.lastName)}
                  </Link>
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>{convertDateFormat(blog?.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="text-sm px-2 py-1 text-slate-700">
              <span>{transformedText("Like", blog?.likes?.length)}</span>
            </div>
          </div>
        </Link>
        {auth?.user?.id === blog?.author?.id && (
          <div className="absolute right-0 top-0">
            <button onClick={handleOpen}>
              <img src="/src/assets/icons/3dots.svg" alt="3dots of Action" />
            </button>
            {isOpen && (
              <div className="action-modal-container">
                <button
                  className="action-menu-item hover:text-lwsGreen"
                  onClick={handleBlogEdit}
                >
                  <img src="/src/assets/icons/edit.svg" alt="Edit" />
                  Edit
                </button>
                <button
                  onClick={handleBlogDelete}
                  className="action-menu-item hover:text-red-500"
                >
                  <img src="/src/assets/icons/delete.svg" alt="Delete" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
