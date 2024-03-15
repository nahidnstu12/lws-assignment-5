import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useBlogService from "../utils/blogService";
import Field from "./Field";

export default function CreateBlog() {
  const { create } = useBlogService();

  const fileUploaderRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("create blog error:", errors);
  const handleBlogSubmit = (data) => {
    // event.preventDefault();
    const formdata = new FormData();
    formdata.append("title", data?.title);
    formdata.append("tags", data?.tags);
    formdata.append("content", data?.content);
    if (data.thumbnail[0]) formdata.append("thumbnail", data.thumbnail[0]);

    // console.log("formdata--", data, formdata);
    create.mutate(formdata);
  };
  return (
    <main>
      <section>
        <div className="container">
          <form
            action="#"
            method="POST"
            className="createBlog"
            // encType="multipart/form-data"
            onSubmit={handleSubmit(handleBlogSubmit)}
          >
            <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
              <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p>Upload Your Image</p>
                <input
                  type="file"
                  name="thumbnail"
                  id="photo"
                  className="text-sm"
                  accept="image/*"
                  {...register("thumbnail", {
                    required: "Thumbnail is Required",
                  })}
                  hidden
                />
              </div>
              {!!errors.thumbnail && (
                <div role="alert" className="text-red-600">
                  {errors.thumbnail.message}
                </div>
              )}
            </div>
            <div className="mb-6">
              <Field error={errors.title}>
                <input
                  {...register("title", { required: "Title is Required" })}
                  className={`${
                    !!errors.title ? "border-red-500" : "border-white/20"
                  }`}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter your blog title"
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field error={errors.tags}>
                <input
                  {...register("tags", { required: "tags is Required" })}
                  className={`${
                    !!errors.tags ? "border-red-500" : "border-white/20"
                  }`}
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field error={errors.content}>
                <textarea
                  {...register("content", { required: "content is Required" })}
                  className={`${
                    !!errors.content ? "border-red-500" : "border-white/20"
                  }`}
                  id="content"
                  name="content"
                  placeholder="Write your blog content"
                  rows={8}
                  defaultValue={""}
                />
              </Field>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Create Blog
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
