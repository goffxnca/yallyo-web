import { Room } from "@/models/types";
import Avatar from "./Avatar";
import Link from "next/link";
import { createNArray } from "@/utils/array-utils";

interface Props extends Room {}

const RoomItem = ({
  desc,
  _id,
  topic,
  language,
  level,
  joiners,
  order,
  size,
}: Props) => {
  const isFullRoom = size === joiners.length;

  return (
    <li
      className={`p-4 rounded-md bg-secondary gap-y-4 grid hover:shadow-2xl ${
        isFullRoom && "opacity-70"
      } `}
    >
      <div className="text-white">
        {language} <span className="text-gray-500">{level}</span>
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
              name={joiner?.displayName || ""}
              url={joiner?.avatarUrl || ""}
              avatarColor={joiner?.avatarColor || ""}
              bio={joiner?.bio || ""}
              followers={joiner?.followers || 0}
              followings={joiner?.followings || 0}
              size={size > 6 ? "sm" : size > 3 ? "md" : "lg"}
              showMic={false}
            />
          );
        })}
        {/* {joiners.map((joiner, index) => (
          <Avatar
            key={index}
            name={joiner}
            size={joiners.length > 6 ? "sm" : joiners.length > 3 ? "md" : "lg"}
            showMic={false}
          />
        ))} */}
      </ul>
      {isFullRoom ? (
        <div className="m-auto text-gray-500 border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-not-allowed hover:text-gray-400">
          Room is full
        </div>
      ) : (
        <a
          href={`/rooms/${_id}`}
          className="m-auto text-white border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-pointer hover:text-accent2"
        >
          Join Now {order}
        </a>
      )}
    </li>
  );
};

export default RoomItem;
