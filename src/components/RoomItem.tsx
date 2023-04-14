import { Room } from "@/models/types";
import Avatar from "./Avatar";
import Link from "next/link";

interface Props extends Room {}

const RoomItem = ({ desc, id, language, level, joiners }: Props) => {
  return (
    <li className="p-4 rounded-md bg-[#1E272C] gap-y-4 grid hover:shadow-2xl">
      <div className="text-white">
        {language} <span className="text-gray-500">{level}</span>
      </div>

      <div className="text-[#2f94e9]">{desc}</div>
      <ul className="flex gap-2">
        {joiners.map((joiner) => (
          <Avatar key={joiner} name={joiner} />
        ))}
      </ul>
      <Link
        href={`/rooms/${id}`}
        target="_blank"
        className="m-auto text-white border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-pointer hover:text-[#2f94e9]"
      >
        Join Now
      </Link>
    </li>
  );
};

export default RoomItem;
