import { useEffect, useState } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchShortProfileByIdAsync } from "@/store/profileSlice";
import { IUser } from "@/types/common";

interface Props {
  userId: string;
  name: string;
  url: string;
  color: string;
}

const UserProfile = ({ userId, name, url, color }: Props) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const [profile, setProfile] = useState<IUser>();

  useEffect(() => {
    dispatch(fetchShortProfileByIdAsync(userId))
      .unwrap()
      .then((profileData) => {
        setProfile(profileData);
      });
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

        <button
          className="border border-white rounded-full px-4 py-2 flex items-center justify-center m-auto text-white hover:text-accent2 mt-4"
          onClick={() => {
            setIsFollowing(!isFollowing);
          }}
        >
          {isFollowing ? (
            <>
              <CheckIcon className="w-6 h-6 mr-1" />
              <span>Following</span>
            </>
          ) : (
            <>
              <PlusIcon className="w-6 h-6 mr-1" />
              <span>Follow</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
