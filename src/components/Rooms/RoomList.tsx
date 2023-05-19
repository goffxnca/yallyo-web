import { Room } from "@/types/frontend";
import RoomItem from "./RoomItem";
import RoomItemSkeleton from "../Skeletons/RoomItemSkeleton";
import { createNArray } from "@/utils/array-utils";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Props {
  rooms: Room[];
  isLoading: boolean;
  showOnTop: boolean;
}

const RoomList = ({ rooms, isLoading, showOnTop }: Props) => {
  console.log("RoomList");

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {showOnTop &&
        isLoading &&
        createNArray(10).map((item) => <RoomItemSkeleton key={item} />)}
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
          createdByMe={room.createdBy === user?.uid}
          order={room.order}
          size={room.size}
        ></RoomItem>
      ))}

      {!showOnTop &&
        isLoading &&
        createNArray(10).map((item) => <RoomItemSkeleton key={item} />)}
    </ul>
  );
};

export default RoomList;
