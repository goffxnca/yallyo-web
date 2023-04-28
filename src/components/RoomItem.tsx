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
  count,
  size,
}: Props) => {
  return (
    <li className="p-4 rounded-md bg-secondary gap-y-4 grid hover:shadow-2xl">
      <div className="text-white">
        {language} <span className="text-gray-500">{level}</span>
      </div>

      <div className=" text-accent2 text-sm italic">
        ({topic}) {desc}
      </div>
      <ul className="flex flex-wrap justify-center gap-2">
        {createNArray(size).map((item, index) => (
          <Avatar
            key={item}
            name={joiners[index]?.name || ""}
            url={joiners[index]?.profileUrl || ""}
            size={size > 6 ? "sm" : size > 3 ? "md" : "lg"}
            showMic={false}
          />
        ))}
        {/* {joiners.map((joiner, index) => (
          <Avatar
            key={index}
            name={joiner}
            size={joiners.length > 6 ? "sm" : joiners.length > 3 ? "md" : "lg"}
            showMic={false}
          />
        ))} */}
      </ul>
      <a
        href={`/rooms/${_id}`}
        className="m-auto text-white border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-pointer hover:text-accent2"
      >
        Join Now {count}
      </a>
    </li>
  );
};

export default RoomItem;
