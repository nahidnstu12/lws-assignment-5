import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useBlogService from "../utils/blogService";
import { key } from "../utils/queryKey";
import CommentSection from "./CommentSection";

export default function BlogDetails() {
  const { id } = useParams();
  const { getOne } = useBlogService();
  const {
    data: blogData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [key.blogs, id],
    queryFn: getOne,
  });
  console.log("details: ", blogData);
  return (
    <>
      <main>
        <section>
          <div className="container text-center py-8">
            <h1 className="font-bold text-3xl md:text-5xl">
              {blogData?.title}
            </h1>
            <div className="flex justify-center items-center my-4 gap-4">
              <div className="flex items-center capitalize space-x-2">
                <div className="avater-img bg-indigo-600 text-white">
                  <span className="">S</span>
                </div>
                <h5 className="text-slate-500 text-sm">
                  {" "}
                  {blogData?.author?.firstName} {blogData?.author?.lastName}
                </h5>
              </div>
              <span className="text-sm text-slate-700 dot">
                {blogData?.createdAt}
              </span>
              <span className="text-sm text-slate-700 dot">
                {blogData?.likes?.length} Likes
              </span>
            </div>
            <img
              className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
              src="/src/assets/blogs/React-Roadmap.jpg"
              alt=""
            />
            <ul className="tags">
              {blogData?.tags?.split(", ")?.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div
              className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"
              dangerouslySetInnerHTML={{ __html: blogData?.content }}
            ></div>
          </div>
        </section>
        <CommentSection comments={blogData?.comments} />
      </main>
      <FloatingAction />
    </>
  );
}

const FloatingAction = () => {
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src="/src/assets/icons/like.svg" alt="like" />
          <span>10</span>
        </li>
        <li>
          <img src="/src/assets/icons/heart.svg" alt="Favourite" />
        </li>
        <Link to="#comments">
          <li>
            <img src="/src/assets/icons/comment.svg" alt="Comments" />
            <span>3</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};
