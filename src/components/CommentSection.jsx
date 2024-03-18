import React, { useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import useCommentService from "../service/commentService";
import { firstAvatar, fullName } from "../utils/helpers";

export default function CommentSection({ comments, blogId }) {
  const { auth } = useAuth();
  const contentRef = useRef();
  const { create, remove } = useCommentService();

  const handleCommentSubmit = () => {
    const body = { content: contentRef.current.value };
    create.mutate({ id: blogId, body });
    contentRef.current.value = null;
  };
  const handleRemoveComment = (cid) => {
    if (confirm("Are you suyr to delete your comment?")) {
      remove.mutate({ id: blogId, cid });
    }
  };
  return (
    <>
      <main>
        <section id="comments">
          <div className="mx-auto w-full md:w-10/12 container">
            <h2 className="text-3xl font-bold my-8">
              Comments ({comments?.length})
            </h2>
            <div className="flex items -center space-x-4">
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">{firstAvatar(auth?.user?.firstName)}</span>
              </div>
              <div className="w-full">
                <textarea
                  className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                  placeholder="Write a comment"
                  defaultValue={""}
                  ref={contentRef}
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCommentSubmit}
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
            {comments?.map((comment) => (
              <div className="flex items-start space-x-4 my-8" key={comment.id}>
                <div className="avater-img bg-orange-600 text-white">
                  <span className="">
                    {firstAvatar(comment?.author?.firstName)}
                  </span>
                </div>

                <div className="w-full">
                  <h5 className="text-slate -500 font-bold">
                    {" "}
                    {fullName(
                      comment?.author?.firstName,
                      comment?.author?.lastName
                    )}
                  </h5>
                  {auth?.user?.id === comment?.author?.id && (
                    <button
                      onClick={() => handleRemoveComment(comment?.id)}
                      className="flex w-full justify-end"
                    >
                      <img src="/src/assets/icons/delete.svg" alt="Delete" />
                    </button>
                  )}
                  <p className="text-slate-300">{comment?.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
