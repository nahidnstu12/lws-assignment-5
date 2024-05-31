import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useBlogService from "../service/blogService";
import useFavoriteService from "../service/favoriteService";
import useLikesService from "../service/likeService";
import {
  convertDateFormat,
  firstAvatar,
  fullName,
  previewImage,
  transformedText,
} from "../utils/helpers";
import { key } from "../utils/queryKey";
import CommentSection from "./CommentSection";
import fillLike from "/src/assets/icons/like-filled.svg";
import Like from "/src/assets/icons/like.svg";
import fillHeart from "/src/assets/icons/heart-filled.svg";
import Heart from "/src/assets/icons/heart.svg";
import comment from "/src/assets/icons/comment.svg";

export default function BlogDetails() {
  const { id } = useParams();
  const { getOne } = useBlogService();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const {
    data: blogData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [key.blogs, id],
    queryFn: getOne,
  });

  if(error){
    return <div>{error}</div>
  }

  if(isLoading){
    return <div>Loading data...</div>
  }

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
                  <span className="">
                    {firstAvatar(blogData?.author?.firstName)}
                  </span>
                </div>
                <h5 className="text-slate-500 text-sm">
                  {fullName(
                    blogData?.author?.firstName,
                    blogData?.author?.lastName
                  )}
                </h5>
              </div>
              <span className="text-sm text-slate-700 dot">
                {convertDateFormat(blogData?.createdAt)}
              </span>
              <span className="text-sm text-slate-700 dot">
                {transformedText("Like", blogData?.likes?.length)}
              </span>
              {auth?.user?.id === blogData?.author?.id && (
                <span
                  className="text-sm text-slate-500 dot cursor-pointer"
                  onClick={() => {
                    navigate(`/edit-blog/${blogData?.id}`);
                  }}
                >
                  Edit Blog
                </span>
              )}
            </div>
            <img
              className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
              src={previewImage("blog", blogData?.thumbnail)}
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
        <CommentSection comments={blogData?.comments} blogId={blogData?.id} />
      </main>
      <FloatingAction
        blogId={blogData?.id}
        isFavBlog={blogData?.isFavourite}
        isLiked={blogData?.isLiked}
        likeCount={blogData?.likes?.length}
        commentCount={blogData?.comments?.length}
      />
    </>
  );
}

const FloatingAction = ({
  blogId,
  isFavBlog,
  isLiked,
  likeCount,
  commentCount,
}) => {
  const { toggle } = useFavoriteService();
  const { toggle: toggleLike } = useLikesService();

  const handleToggleFav = () => {
    toggle.mutate(blogId);
  };

  const handleToggleLike = () => {
    toggleLike.mutate(blogId);
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li onClick={handleToggleLike}>
          {/* TODO: Fix later */}
          {isLiked ? (
            <img src={fillLike} alt="Like" />
          ) : (
            <img src={Like} alt="Like" />
          )}
          <span>{likeCount}</span>
        </li>
        <li onClick={handleToggleFav}>
          {isFavBlog ? (
            <img src={fillHeart} alt="Favourite" />
          ) : (
            <img src={Heart} alt="Favourite" />
          )}
        </li>

        <a href="#comments">
          <li>
            <img src={comment} alt="Comments" />
            <span>{commentCount}</span>
          </li>
        </a>
      </ul>
    </div>
  );
};
