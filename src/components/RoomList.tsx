import { Room } from "@/models/types";
import RoomItem from "./RoomItem";

const ROOMS = [{}];

interface Props {
  rooms: Room[];
}

const RoomList = ({ rooms }: Props) => {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomItem
          key={room.id}
          id="dd"
          language={room.language}
          level={room.level}
          desc={room.desc}
          joiners={room.joiners}
        ></RoomItem>
      ))}
    </ul>
  );
};

export default RoomList;
