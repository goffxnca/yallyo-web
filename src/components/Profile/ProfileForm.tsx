/* eslint-disable @next/next/no-img-element */
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  extractOnlyDirtiedField,
  maxLength,
  minLength,
} from "@/utils/form-utils";
import DarkOverlay from "../Layouts/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useForm, FieldValues } from "react-hook-form";
import { updateProfileAsync } from "@/store/profileSlice";
import Notification from "@/components/UIs/Notification";
import ProfileImageInput from "./ProfileImageInput";
import { uploadFileToStorage } from "@/utils/file-utils";
import { useRouter } from "next/router";

const ProfileForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const { profile, status } = useSelector((state: RootState) => state.profile);
  const [showUpdateSuccessNotificaiton, setShowUpdateSuccessNotificaiton] =
    useState(false);

  const [uploadingImageToStorage, setUploadingImageToStorage] =
    useState<boolean>(false);

  const defaultValues = {
    dname: profile?.dname,
    bio: profile?.bio,
    photoURLOrigin: profile?.photoURL,
    photoURL: profile?.photoURL,
  };

  const router = useRouter();
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({ defaultValues: defaultValues });

  const loading = status === "loading" || uploadingImageToStorage;

  const onFormSubmit = async (formData: FieldValues) => {
    const dirtiedFormData = extractOnlyDirtiedField(formData, dirtyFields);

    let uploadedUrl;
    if (dirtiedFormData.photoURL) {
      setUploadingImageToStorage(true);
      try {
        uploadedUrl = await uploadFileToStorage(
          "us",
          formData.photoURL.fileContent
        );
      } catch (error) {
        console.error(
          "Error occured during uploading new profile image to server",
          error
        );
      }
      setUploadingImageToStorage(false);
    }

    let toBeUpdatedProfile;
    if (uploadedUrl) {
      toBeUpdatedProfile = { ...dirtiedFormData, photoURL: uploadedUrl };
    } else {
      toBeUpdatedProfile = dirtiedFormData;
    }
    dispatch(updateProfileAsync(toBeUpdatedProfile)).then(() => {
      setShowUpdateSuccessNotificaiton(true);
    });
  };

  if (!profile) {
    return <div></div>;
  }

  return (
    <div>
      <form
        className="lg:w-1/2 mx-auto bg-secondary p-6 rounded-lg mt-14"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="space-y-6 ">
          {/* Form Header */}
          <div className="border-b border-white/10 pb-6">
            {/* Picture */}
            <div className="text-center -mt-20">
              <div className="rounded-2xl px-2 space-y-2">
                <img
                  className="mx-auto h-32 w-32  object-cover rounded-full"
                  src={profile.photoURL}
                  alt="User Avatar"
                />
                <h3 className="mt-6 text-2xl font-semibold leading-7 tracking-tight text-accent2">
                  {profile.dname}
                </h3>
                <p className="text-sm leading-6 text-gray-200">
                  [Bio] {profile.bio}
                </p>

                <div className="flex justify-center gap-x-4">
                  <p className="text-sm text-gray-400">
                    <span className="font-bold  text-white">
                      {profile.followers}
                    </span>{" "}
                    Followers
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-bold text-white">
                      {profile.followings}
                    </span>{" "}
                    Following
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-white">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 pl-4">
              {/* Display Name */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="dname"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Display Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="dname"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent2 sm:text-sm sm:leading-6"
                    {...register("dname", {
                      required: "This field is required",
                      minLength: { ...minLength(2) },
                      maxLength: { ...maxLength(30) },
                    })}
                  />
                </div>

                {errors.dname?.message?.toString() && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.dname?.message?.toString()}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent2 sm:text-sm sm:leading-6"
                    value={profile.email}
                    onChange={() => {}}
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="col-span-full">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    id="bio"
                    rows={2}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent2 sm:text-sm sm:leading-6"
                    placeholder="Write a few sentences about yourself."
                    {...register("bio", {
                      required: "This field is required",
                      minLength: { ...minLength(5) },
                      maxLength: { ...maxLength(100) },
                    })}
                  />
                </div>
                {errors.bio?.message?.toString() && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.bio?.message?.toString()}
                  </div>
                )}
              </div>

              {/* Picture */}
              <div className="col-span-full">
                <label
                  htmlFor="photoURL"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Picture
                </label>
                <ProfileImageInput
                  id="photoURL"
                  register={() =>
                    register("photoURL", {
                      required: "Profile picture is required",
                    })
                  }
                  originFileUrl={profile.photoURL}
                  unregister={unregister}
                  error={errors.photoURL?.message || ""}
                  setValue={setValue}
                />
              </div>
            </div>
          </div>

          {/* Notification Section */}
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-white">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              We&apos;ll always let you know about important changes, but you
              pick what else you want to hear about.
            </p>

            <div className="space-y-10 pl-4">
              <fieldset>
                <div className="mt-6 space-y-6">
                  {/* Notification Option1 */}
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="notifyOnFollow"
                        name="notifyOnFollow"
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/10 bg-white/5 text-accent2 focus:ring-accent2 focus:ring-offset-gray-900"
                      />
                    </div>
                    <div className="text-sm leading-6 select-none">
                      <label
                        htmlFor="notifyOnFollow"
                        className="font-medium text-white"
                      >
                        Account Following
                      </label>
                      <p className="text-gray-400">
                        Get notified when someone starts following your account.
                      </p>
                    </div>
                  </div>
                  {/* Notification Option2 */}
                  {/* <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="notifyOnInvite"
                        name="notifyOnInvite"
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/10 bg-white/5 text-accent2 focus:ring-accent2 focus:ring-offset-gray-900"
                      />
                    </div>
                    <div className="text-sm leading-6 select-none">
                      <label
                        htmlFor="notifyOnInvite"
                        className="font-medium text-white"
                      >
                        Room Invitation
                      </label>
                      <p className="text-gray-400">
                        Get notified when someone invites you to join a room.
                      </p>
                    </div>
                  </div> */}
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className={`mt-6 flex items-center justify-end gap-x-6`}>
          <button
            type="submit"
            className={`flex rounded-md px-6 py-3 text-sm font-semibold shadow-sm select-none ${
              !isDirty && "opacity-25"
            } ${
              loading
                ? "bg-accent2 text-secondary pointer-events-none"
                : "bg-accent1 text-white"
            }`}
            disabled={!isDirty || loading}
          >
            {loading && (
              <div className="animate-pulse">
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              </div>
            )}

            <span className="text-md">{loading ? "Updating" : "Update"}</span>
          </button>
        </div>
      </form>

      {loading && <DarkOverlay />}

      {showUpdateSuccessNotificaiton && (
        <Notification
          type="success"
          messageTitle="Update profile successfully!"
          autoFadeout={true}
          autoFadeoutInMs={1000}
          onFadedOut={() => {
            router.reload();
          }}
        />
      )}
    </div>
  );
};

export default ProfileForm;
