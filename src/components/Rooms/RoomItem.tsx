import Avatar from "../UIs/Avatar";
import { createNArray } from "@/utils/array-utils";
import { useEffect, memo, useState } from "react";
import {
  MicrophoneIcon,
  NoSymbolIcon,
  SpeakerWaveIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { IRoom } from "@/types/common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteRoomAsync } from "@/store/roomSlice";
import { useMediaQuery } from "usehooks-ts";

interface Props extends IRoom {
  createdByMe: boolean;
  currentLoggedInUserIsAdmin: boolean;
  onClickJoin: Function;
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
    createdBy,
    createdByMe,
    currentLoggedInUserIsAdmin,
  } = room;

  const dispatch: AppDispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { status } = useSelector((state: RootState) => state.room);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const isFullRoom = size === joiners.length;
  const isLoading = status === "loading";

  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, [room]);

  return (
    <li
      className={`p-4 rounded-md bg-secondary gap-y-4 grid transition-all hover:bg-gray-900 hover:shadow-2xl ${
        isAnimating && "animate-fadeIn"
      } ${createdByMe && "border border-accent2"} `}
    >
      <div className="flex justify-between text-white">
        <div className="flex items-center text-gray-200">
          {room && room.features && !room.features.video && (
            <SpeakerWaveIcon className="w-5 h-5 mr-2" />
          )}
          Room{order}
        </div>
        {/* {/* <div className="">
          {language} <span className="text-gray-500">{level}</span>
        </div> */}

        {/* < className="h-5 w-5" />yo */}

        <div className="tex-white text-[12px] text-gray-500">
          {room.joiners.length} / {room.size}
        </div>
      </div>

      <div className=" text-accent2 text-sm italic">
        {/* {topic ? (desc ? `(${topic}) ${desc}` : topic) : "Any Topics"} */}
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
      <div className="relative flex items-center text-white">
        {currentLoggedInUserIsAdmin && (
          <div className="absolute left-0 bottom-0 text-gray-500">
            <TrashIcon
              className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer"
              onClick={() => {
                dispatch(deleteRoomAsync(_id));
              }}
            />
            {isLoading && <div className="text-white">Loading...</div>}
          </div>
        )}
        {isFullRoom ? (
          <div className="m-auto flex items-center text-gray-500 border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-not-allowed hover:text-gray-400">
            <NoSymbolIcon className="h-5 w-5 mr-2" />
            <span className="text-md select-none">Full Room</span>
          </div>
        ) : (
          <span
            // href={`/room/${sid}`}
            // target={isDesktop ? "_blank" : "_self"}
            className="m-auto text-white border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-pointer hover:bg-accent2 hover:border-solid hover:border-secondary hover:font-semibold hover:text-accent1 transition-all ease-in-out"
            onClick={() => {
              room.onClickJoin(sid);
            }}
          >
            Join
          </span>
          // <Link href={`/room/${_id}`}>
          //   <div className="m-auto text-white border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-pointer hover:text-accent2">
          //     Join Now {order}
          //   </div>
          // </Link>
        )}
        {/* <div className="absolute right-0 bottom-0 text-gray-500">
          <div className="flex space-x-1">
            {room && room.features && !room.features.video && (
              <MicrophoneIcon className="w-5 h-5" />
            )}
            {room && room.features && room.features.video && (
              <VideoCameraIcon className="w-5 h-5" />
            )}
          </div>
        </div> */}
      </div>
    </li>
  );
});

RoomItem.displayName = "RoomItem";

export default RoomItem;
