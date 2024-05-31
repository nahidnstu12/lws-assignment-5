import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useProfileService from "../service/profileService";
import { firstAvatar, fullName, previewImage } from "../utils/helpers";
import BlogCard from "./BlogCard";

export default function ProfileComponent() {
  const { id } = useParams();
  const { getProfile, updateProfile, updateAvatar } = useProfileService();
  const { auth } = useAuth();
  const fileUploaderRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }
      updateAvatar.mutate(formData);
    } catch (error) {
      console.log("updateImageDisplay: ", error);
    }
  };
  const [bio, setBio] = useState(auth?.user?.bio || "");
  const [editMode, setEditMode] = useState(false);

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: getProfile,
  });

  const handleProfileUpdate = async () => {
    updateProfile.mutate({ bio });
    setEditMode(false);
  };

  // console.log("profile data:", profile);
  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {profile?.avatar ? (
              <img
                className="max-w-full rounded-full w-[500px] h-[150px]"
                src={previewImage("avatar", profile?.avatar)}
                alt={profile?.firstName}
              />
            ) : (
              <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                <span className="">{firstAvatar(profile?.firstName)}</span>
              </div>
            )}

            <form id="form" encType="multipart/form-data">
              <button
                className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                onClick={handleImageUpload}
                type="submit"
              >
                <img src="/src/assets/icons/edit.svg" alt="Edit" />
              </button>
              <input id="file" type="file" ref={fileUploaderRef} hidden />
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {fullName(profile?.firstName, profile?.lastName)}
            </h3>
            <p className="leading-[231%] lg:text-lg">{profile?.email}</p>
          </div>
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              {editMode ? (
                <textarea
                  className="auth-input"
                  value={bio}
                  rows={4}
                  cols={55}
                  onChange={(e) => setBio(e.target.value)}
                />
              ) : (
                <p className="leading-[188%] text-gray-400 lg:text-lg">
                  {profile?.bio}
                </p>
              )}
            </div>
            {editMode ? (
              <button
                className="flex-center h-7 w-7 rounded-full"
                onClick={handleProfileUpdate}
              >
                <img src="/src/assets/icons/check.svg" alt="Check" />
              </button>
            ) : (
              <button
                className="flex-center h-7 w-7 rounded-full"
                onClick={() => setEditMode(true)}
              >
                <img src="/src/assets/icons/edit.svg" alt="Edit" />
              </button>
            )}
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
        </div>
        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {profile?.blogs?.map((blog) => (
            <BlogCard blog={blog} key={blog?.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
