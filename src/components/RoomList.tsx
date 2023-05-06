import { Room } from "@/models/types";
import RoomItem from "./RoomItem";
import RoomItemSkeleton from "./Skeletons/RoomItemSkeleton";
import { createNArray } from "@/utils/array-utils";

interface Props {
  rooms: Room[];
  isLoading: boolean;
}

const RoomList = ({ rooms, isLoading }: Props) => {
  console.log("RoomList");
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
          order={room.order}
          size={room.size}
        ></RoomItem>
      ))}
      {isLoading &&
        createNArray(10).map((item) => (
          <RoomItemSkeleton key={item} focus={item === 1} />
        ))}
    </ul>
  );
};

export default RoomList;
