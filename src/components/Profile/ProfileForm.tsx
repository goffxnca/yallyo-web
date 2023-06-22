/* eslint-disable @next/next/no-img-element */
import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import TextInput from "../Forms/Inputs/TextInput";
import { useEffect, useState } from "react";
import DropdownInput3 from "../Forms/Inputs/DropodownInput3";
import { createNArrayFrom } from "@/utils/array-utils";
import { FieldValues, useForm } from "react-hook-form";
import { maxLength, minLength } from "@/utils/form-utils";
import DarkOverlay from "../Layouts/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

import { fetchProfileAsync } from "@/store/profileSlice";

interface Props {
  onSubmit: (data: FieldValues) => void;
}

const ProfileForm = ({ onSubmit }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (dispatch && user) {
      dispatch(fetchProfileAsync());
    }
  }, [dispatch, user]);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onFormSubmit = (data: FieldValues) => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     onSubmit(data);
  //   }, 5000);
  // };

  if (!profile) {
    return <div></div>;
  }

  return (
    <div>
      <form
        className="md:w-1/2 mx-auto bg-secondary p-6 rounded-lg mt-10"
        onSubmit={() => {}}
      >
        <div className="space-y-6 ">
          {/* Form Header */}
          <div className="border-b border-white/10 pb-6">
            {/* Picture */}
            <div className="text-center -mt-20">
              <div className="rounded-2xl px-2 space-y-2">
                <img
                  className="mx-auto h-32 w-32 rounded-full"
                  src={profile.photoURL}
                  alt=""
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

            {/* Display Name */}
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 pl-4">
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
                    name="dname"
                    id="dname"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent2 sm:text-sm sm:leading-6"
                    value={profile.dname}
                    onChange={() => {}}
                  />
                </div>
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
                    name="bio"
                    rows={2}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent2 sm:text-sm sm:leading-6"
                    placeholder="Write a few sentences about yourself."
                    value={profile.bio}
                    onChange={() => {}}
                  />
                </div>
              </div>

              {/* Profile Picture */}
              <div className="col-span-full">
                <label
                  // htmlFor="photoURL"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Profile Picture
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-500"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    disabled
                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm cursor-not-allowed"
                  >
                    Change
                  </button>
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  **To update your profile picture, please change your Google
                  Account profile picture from
                  <a
                    href="https://myaccount.google.com/"
                    className="text-white text-xs ml-1 underline"
                    target="_blank"
                  >
                    here
                  </a>
                  . Yallyo currently doesn&apos;t support this function yet.
                  Please note that it may take a few minutes to hours for your
                  new Google account profile picture to take effect, check this
                  <a
                    href="https://support.google.com/mail/thread/2904884/profile-picture-is-uploaded-but-icon-photo-won-t-change?hl=en"
                    className="text-white text-xs ml-1 underline"
                    target="_blank"
                  >
                    solution
                  </a>
                  .
                </p>
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
                  <div className="relative flex gap-x-3">
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
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-accent1 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent2 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-"
          >
            Save
          </button>
        </div>
      </form>
      {/* 
      {loading && <DarkOverlay />}

      {loginSuccessfully && (
        <Notification
          type="success"
          messageTitle="Login successfully!"
          messageBody="You are now ready to create a chat room."
          autoFadeout={true}
          onFadedOut={() => {}}
        />
      )} */}
    </div>
  );
};

export default ProfileForm;
