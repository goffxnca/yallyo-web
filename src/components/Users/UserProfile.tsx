import { useEffect, useState } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchShortProfileByIdAsync,
  followAccountAsync,
} from "@/store/profileSlice";
import { IUser } from "@/types/common";
import DarkOverlay from "../Layouts/Overlay";
import Notification from "../UIs/Notification";

interface Props {
  userId: string;
  name: string;
  url: string;
  color: string;
}

const UserProfile = ({ userId, name, url, color }: Props) => {
  const { status } = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [profile, setProfile] = useState<IUser>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isMe = profile?._id === user?.uid;
  const isFollowing = (profile && (profile as any)["isFollowing"]) || false;

  useEffect(() => {
    dispatch(fetchShortProfileByIdAsync(userId))
      .unwrap()
      .then((profileData) => {
        setProfile(profileData);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-5 lg:px-10 w-[500px]">
      {/* Avatar */}
      <div className="flex justify-center items-start">
        <div className="border-4 border-accent2 p-1 rounded-full w-44">
          <div
            className={`relative flex justify-center items-center text-white rounded-full w-40 h-40${
              name ? "" : "border border-dashed border-gray-600"
            } select-none cursor-pointer`}
            style={{
              backgroundImage: url ? `url(${url})` : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>

      <div className="text-white my-2">
        <h2 className="text-4xl mb-4 text-center text-accent2">{name}</h2>
        <p className=" text-gray-400 text-center">[bio] {profile?.bio}</p>
      </div>

      <div className="mt-10">
        <div className="flex justify-center gap-x-4 ">
          <p className="text-sm text-gray-400">
            <span className="font-bold text-lg text-white mr-1">
              {profile?.followers}
            </span>
            Followers
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-bold text-lg text-white mr-1">
              {profile?.followings}
            </span>
            Following
          </p>
        </div>

        {user && profile && !isMe && (
          <button className="flex items-center justify-center m-auto border border-white rounded-full px-4 py-2 text-white hover:text-accent2 mt-4">
            {isFollowing ? (
              <div className="flex items-center justify-center w-auto">
                <CheckIcon className="w-6 h-6 mr-1" />
                <span className="">You are following {profile.dname}</span>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-auto"
                onClick={() => {
                  dispatch(followAccountAsync(userId))
                    .unwrap()
                    .then((data) => {
                      setShowSuccessModal(true);
                    })
                    .catch(() => {});
                }}
              >
                <PlusIcon className="w-6 h-6 mr-1" />
                <span>Follow</span>
              </div>
            )}
          </button>
        )}
      </div>
      {status === "loading" && <DarkOverlay />}
      {status === "error" && (
        <Notification
          type="error"
          messageTitle="Something went wrong!"
          messageBody={"The server cannot process your request."}
          autoFadeout={true}
          onFadedOut={() => {}}
        />
      )}

      {showSuccessModal && (
        <Notification
          type="success"
          messageTitle="Notification"
          messageBody={`You are now following ${profile?.dname}`}
          autoFadeout={true}
          onFadedOut={() => {}}
        />
      )}

      {isFollowing && (
        <div className="text-gray-400 text-xs italic mt-6">
          **We do not support unfollow function at the moment.
        </div>
      )}
    </div>
  );
};

export default UserProfile;
