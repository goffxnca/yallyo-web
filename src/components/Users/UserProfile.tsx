import { useEffect, useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchShortProfileByIdAsync,
  followAccountAsync,
  unfollowAccountAsync,
} from "@/store/accountSlice";
import DarkOverlay from "../Layouts/Overlay";
import Notification from "../UIs/Notification";

interface Props {
  userId: string;
  name: string;
  url: string;
}

const UserProfile = ({ userId, name, url }: Props) => {
  const { account, status } = useSelector((state: RootState) => state.account);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [showSuccessFollowModal, setShowSuccessFollowModal] = useState(false);
  const [showSuccessUnFollowModal, setShowSuccessUnFollowModal] =
    useState(false);

  const isMe = account?._id === user?.uid;

  useEffect(() => {
    dispatch(fetchShortProfileByIdAsync(userId));
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
        <p className=" text-gray-400 text-center">[bio] {account?.bio}</p>
      </div>

      <div className="">
        <div className="flex justify-center gap-x-4 ">
          <p className="text-sm text-gray-400">
            <span className="font-bold text-lg text-white mr-1">
              {account?.followers}
            </span>
            Followers
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-bold text-lg text-white mr-1">
              {account?.followings}
            </span>
            Following
          </p>
        </div>

        {user && account && !isMe && (
          <div className="mt-10">
            {account.isFollowing ? (
              <div className="">
                <div className="flex justify-center text-white ">
                  <CheckIcon className="w-6 h-6 mr-1" />
                  <span className="">You are following {account.dname}</span>
                </div>

                <button
                  className="flex items-center justify-center m-auto border border-white rounded-full px-4 py-2 text-white hover:text-red-500 mt-4"
                  onClick={() => {
                    dispatch(unfollowAccountAsync(userId))
                      .unwrap()
                      .then((data) => {
                        setShowSuccessUnFollowModal(true);
                      })
                      .catch(() => {});
                  }}
                >
                  <MinusIcon className="w-6 h-6 mr-1" />
                  <span>UnFollow</span>
                </button>
              </div>
            ) : (
              <button
                className="flex items-center justify-center m-auto border border-white rounded-full px-4 py-2 text-white hover:text-accent2 mt-4"
                onClick={() => {
                  dispatch(followAccountAsync(userId))
                    .unwrap()
                    .then((data) => {
                      setShowSuccessFollowModal(true);
                    })
                    .catch(() => {});
                }}
              >
                <PlusIcon className="w-6 h-6 mr-1" />
                <span>Follow</span>
              </button>
            )}
          </div>
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

      {showSuccessFollowModal && (
        <Notification
          type="success"
          messageTitle="Follow successfully"
          messageBody={`You are now following ${account?.dname} account.`}
          autoFadeout={true}
          onFadedOut={() => {}}
        />
      )}

      {showSuccessUnFollowModal && (
        <Notification
          type="success"
          messageTitle="Unfollow successfully"
          messageBody={`You are now no longer following ${account?.dname} account.`}
          autoFadeout={true}
          onFadedOut={() => {}}
        />
      )}
    </div>
  );
};

export default UserProfile;
