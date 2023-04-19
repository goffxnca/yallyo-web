import { Room } from "@/models/types";
import RoomItem from "./RoomItem";

interface Props {
  rooms: Room[];
}

const RoomList = ({ rooms }: Props) => {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {rooms.map((room) => (
        <RoomItem
          key={room.id}
          id={room.id}
          language={room.language}
          level={room.level}
          desc={room.desc}
          joiners={room.joiners}
          active={room.active}
          topic={room.topic}
          createdDate={room.createdDate}
          createdDateISO={room.createdDateISO}
          createdBy={room.createdBy}
        ></RoomItem>
      ))}
    </ul>
  );
};

export default RoomList;
