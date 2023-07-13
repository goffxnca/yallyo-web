import Avatar from "../UIs/Avatar";
import { createNArray } from "@/utils/array-utils";
import { useEffect, memo, useState } from "react";
import {
  MicrophoneIcon,
  NoSymbolIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { IRoom } from "@/types/common";

interface Props extends IRoom {
  createdByMe: boolean;
}

const RoomItem = memo((room: Props) => {
  const {
    desc,
    _id,
    sid,
    topic,
    language,
    level,
    joiners,
    order,
    size,
    features,
    createdByMe,
  } = room;
  const isFullRoom = size === joiners.length;

  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, [room]);

  return (
    <li
      className={`p-4 rounded-md bg-secondary gap-y-4 grid hover:shadow-2xl ${
        isAnimating && "animate-fadeIn"
      } ${createdByMe && "border border-accent2"} `}
    >
      <div className="flex justify-between text-white">
        <div className="">
          {language} <span className="text-gray-500">{level}</span>
        </div>

        {/* < className="h-5 w-5" />yo */}

        <div className="tex-white text-[12px] text-gray-500">
          {room.joiners.length} / {room.size}
        </div>
      </div>

      <div className=" text-accent2 text-sm italic">
        ({topic}) {desc}
      </div>
      <ul className="flex flex-wrap justify-center gap-2">
        {createNArray(size).map((item, index) => {
          const joiner = joiners[index];
          return (
            <Avatar
              key={item}
              userId={joiner?._id}
              name={joiner?.dname}
              url={joiner?.photoURL}
              color={joiner?.color}
              size={size > 6 ? "sm" : size > 3 ? "md" : "lg"}
              hilight={false}
            />
          );
        })}
        {/* {joiners.map((joiner, index) => (
          <Avatar
            key={index}
            name={joiner}
            size={joiners.length > 6 ? "sm" : joiners.length > 3 ? "md" : "lg"}

          />
        ))} */}
      </ul>
      <div className="flex items-center text-white">
        {/* <div>bottom left</div> */}
        {isFullRoom ? (
          <div className="m-auto flex items-center text-gray-500 border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-not-allowed hover:text-gray-400">
            <NoSymbolIcon className="h-5 w-5 mr-2" />
            <span className="text-md">Full Room</span>
          </div>
        ) : (
          <a
            href={`/room/${sid}`}
            target="_blank"
            className="m-auto text-white border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-pointer hover:text-accent2"
          >
            Join Now
          </a>
          // <Link href={`/room/${_id}`}>
          //   <div className="m-auto text-white border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-pointer hover:text-accent2">
          //     Join Now {order}
          //   </div>
          // </Link>
        )}
        <div className="text-gray-500">
          <div className="flex">
            {room && room.features && room.features.audio && (
              <MicrophoneIcon className="w-4 h-4" />
            )}
            {room && room.features && room.features.video && (
              <VideoCameraIcon className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
    </li>
  );
});

RoomItem.displayName = "RoomItem";

export default RoomItem;
