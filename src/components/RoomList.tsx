import { Room } from "@/models/types";
import RoomItem from "./RoomItem";
import { useEffect, useRef } from "react";

interface Props {
  rooms: Room[];
  onLoadMoreRooms: Function;
}

const RoomList = ({ rooms, onLoadMoreRooms }: Props) => {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {rooms.map((room) => (
        <RoomItem
          key={room._id}
          _id={room._id}
          language={room.language}
          level={room.level}
          desc={room.desc}
          joiners={room.joiners}
          active={room.active}
          topic={room.topic}
          // createdDate={room.createdDate}
          // createdDateISO={room.createdDateISO}
          createdBy={room.createdBy}
          count={room.count}
          size={room.size}
        ></RoomItem>
      ))}
    </ul>
  );
};

export default RoomList;
