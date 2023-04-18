import { Room } from "@/models/types";
import Avatar from "./Avatar";
import Link from "next/link";

interface Props extends Room {}

const RoomItem = ({ desc, id, topic, language, level, joiners }: Props) => {
  return (
    <li className="p-4 rounded-md bg-secondary gap-y-4 grid hover:shadow-2xl">
      <div className="text-white">
        {language} <span className="text-gray-500">{level}</span>
      </div>

      <div className=" text-accent2 text-sm italic">
        ({topic}) {desc}
      </div>
      <ul className="flex flex-wrap justify-center gap-2">
        {joiners.map((joiner, index) => (
          <Avatar key={index} name={joiner} size="lg" />
        ))}
      </ul>
      <Link
        href={`/rooms/${id}`}
        className="m-auto text-white border border-dashed px-10 py-1 rounded-md border-gray-500 cursor-pointer hover:text-accent2"
      >
        Join Now
      </Link>
    </li>
  );
};

export default RoomItem;
