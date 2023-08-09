import RoomItem from "./RoomItem";
import RoomItemSkeleton from "../Skeletons/RoomItemSkeleton";
import { createNArray } from "@/utils/array-utils";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { IRoom } from "@/types/common";
import { useCallback, useState } from "react";
import LoginModal from "../Modals/LoginModal";

interface Props {
  rooms: IRoom[];
  isLoading: boolean;
  showOnTop: boolean;
  showFullLobby: boolean;
}

const RoomList = ({ rooms, isLoading, showOnTop, showFullLobby }: Props) => {
  // console.log("RoomList");

  const { user } = useSelector((state: RootState) => state.auth);

  const isAdmin = user?.email === "goffxnca@gmail.com";
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRoomSid, setSelectedRoomSid] = useState("");

  const onClickJoinRoom = useCallback(
    (roomSid: string) => {
      setSelectedRoomSid(roomSid);
      if (user) {
        window.location.href = `/room/${roomSid}`;
      } else {
        setShowLoginModal(true);
      }
    },
    [user]
  );

  return (
    <>
      <ul
        className={`grid md:grid-cols-2 ${
          !showFullLobby && "lg:grid-cols-3"
        }  gap-4`}
      >
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
            onClickJoin={onClickJoinRoom}
          ></RoomItem>
        ))}

        {!showOnTop &&
          isLoading &&
          createNArray(10).map((item) => <RoomItemSkeleton key={item} />)}
      </ul>
      {showLoginModal && (
        <LoginModal
          onCloseModal={() => {
            setShowLoginModal(false);
          }}
          onLoginSucceed={() => {
            setShowLoginModal(false);
            window.location.href = `/room/${selectedRoomSid}`;
          }}
        />
      )}
    </>
  );
};

export default RoomList;
