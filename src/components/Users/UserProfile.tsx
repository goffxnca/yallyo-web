import Image from "next/image";
import { useState } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { convertFullnameToAbbr } from "@/utils/string-utils";

interface Props {
  userId: string;
  name: string;
  url: string;
  color: string;
}

const UserProfile = ({ userId, name, url, color }: Props) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const nameAbbr = name ? convertFullnameToAbbr(name) : "";

  return (
    <div className="p-5 md:p-10 min-w-[400px] max-w-[600px] md:flex">
      {/* Avatar */}
      <div className="flex justify-center items-start">
        <div className="border-4 border-accent2 p-1 rounded-full w-44">
          <div
            className={`relative flex justify-center items-center text-white rounded-full w-40 h-40${
              name ? "" : "border border-dashed border-gray-600"
            } select-none cursor-pointer`}
            style={{
              backgroundColor: !url && name ? color : "",
              backgroundImage: url ? `url(${url})` : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {name && !url && (
              <div>
                {nameAbbr && <div className="text-5xl">{nameAbbr}</div>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-white md:ml-4">
        <h2 className="text-4xl mb-4 text-center md:text-left mt-4 md:mt- text-accent2">
          {name}
        </h2>
        <p className="mb-4 text-gray-400 text-center md:text-left">Biko Koko</p>

        <div className="flex justify-center gap-x-4">
          <p className="text-sm text-gray-400">
            <span className="font-bold  text-white">7</span> Followers
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-bold text-white">18</span> Following
          </p>
        </div>

        {/* <p className="text-sm text-gray-400">Member Since: 13/33/2022</p> */}

        <button
          className="border border-white rounded-full px-4 py-2 flex items-center justify-center m-auto hover:text-accent2 mt-4"
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

// <div className="p-10 md:w-[800px]flex">
//   <div className="md:flex gap-x-4 items-center text-center md:text-left">
//     <div
//       className={`rounded-full border-4 border-accent2 w-40 h-40 p-1 mx-auto`}
//       style={{ backgroundColor: !url ? avatarColor : "" }}
//     >
//       {url && (
//         <img
//           src={url}
//           alt="cool"
//           className="object-cover h-full w-full rounded-full"
//         />
//       )}
//     </div>

//     <div className="text-white grid gap-y-2">
//       <h2 className="text-4xl">{name}</h2>
//       {/* <p>
//         Hes been on Friends, Seinfeld and That 70 Show. Has been in cartoons
//         like Lilo and Stitch and Invader Zim. In movies like Galaxy Quest
//         and Sky High
//       </p> */}
//       <div className="flex justify-between">
//         <p className="text-sm text-gray-400">
//           <span className="font-bold">{followers}</span> Followers
//         </p>
//         <p className="text-sm text-gray-400">
//           <span className="font-bold">{followings}</span> Followers
//         </p>
//       </div>

//       <p className="text-sm text-gray-400">Member Since: 13/33/2022</p>

//       <button
//         className="border border-white rounded-full px-4 py-2 flex items-center justify-center m-auto hover:text-accent2 mt-2"
//         onClick={() => {
//           setIsFollowing(!isFollowing);
//         }}
//       >
//         {isFollowing ? (
//           <>
//             <CheckIcon className="w-6 h-6 mr-1" />
//             <span>Following</span>
//           </>
//         ) : (
//           <>
//             <PlusIcon className="w-6 h-6 mr-1" />
//             <span>Follow</span>
//           </>
//         )}
//       </button>
//     </div>
//     <div>{/* <ButtonLong text="Follow" /> */}</div>
//   </div>
// </div>
