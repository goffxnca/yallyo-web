import RoomItem from "./RoomItem";
import RoomItemSkeleton from "../Skeletons/RoomItemSkeleton";
import { createNArray } from "@/utils/array-utils";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { IRoom } from "@/types/common";

interface Props {
  rooms: IRoom[];
  isLoading: boolean;
  showOnTop: boolean;
}

const RoomList = ({ rooms, isLoading, showOnTop }: Props) => {
  // console.log("RoomList");

  const { user } = useSelector((state: RootState) => state.auth);

  const isAdmin = user?.email === "goffxnca@gmail.com";

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3  gap-4">
      {showOnTop &&
        isLoading &&
        createNArray(10).map((item) => <RoomItemSkeleton key={item} />)}
      {rooms.map((room) => (
        <RoomItem
          key={room._id}
          _id={room._id}
          sid={room.sid}
          language={room.language}
          level={room.level}
          topic={room.topic}
          desc={room.desc}
          joiners={room.joiners}
          size={room.size}
          createdByMe={room.createdBy === user?.uid}
          order={room.order}
          features={room.features}
          active={room.active}
          createdAt={room.createdAt}
          createdBy={room.createdBy}
          currentLoggedInUserIsAdmin={isAdmin}
        ></RoomItem>
      ))}

      {!showOnTop &&
        isLoading &&
        createNArray(10).map((item) => <RoomItemSkeleton key={item} />)}
    </ul>
  );
};

export default RoomList;
