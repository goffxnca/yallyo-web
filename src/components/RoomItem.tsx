import { Room } from "@/models/types";
import Avatar from "./Avatar";

interface Props extends Room {}

const RoomItem = ({ desc, id, language, level, joiners }: Props) => {
  return (
    <li className="p-4 rounded-md bg-[#1E272C] gap-y-4 grid">
      <div className="text-white">
        {language} <span className="text-gray-500">{level}</span>
      </div>

      <div className="text-[#2f94e9]">{desc}</div>
      <ul className="flex gap-2">
        {joiners.map((joiner) => (
          <Avatar key={joiner} name={joiner} />
        ))}
      </ul>
    </li>
  );
};

export default RoomItem;
