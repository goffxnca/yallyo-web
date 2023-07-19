import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { TMinimalUser } from "@/types/common";
import ChatMessageItem from "../Session/ChatMessageItem";

const Lobby = () => {
  const {
    rooms,
    roomsGroupedByLanguage,
    status,
    error,
    canLoadMore,
    recentCreatedRoomSid,
  } = useSelector((state: RootState) => state.room);

  return (
    <section className="w-full h-[400px] bg-gray-500 overflow-y-scroll">
      <h2>Lobby</h2>
      <ul className="space-y-2">
        {rooms.map((room) => {
          return room.joiners.map((joiner) => {
            return (
              // <div key={room._id + joiner._id} className="text-white">
              //   {joiner.dname}
              // </div>

              <ChatMessageItem
                key={room._id + joiner._id}
                id={joiner._id}
                type={"chat"}
                subType=""
                message="yoyo"
                sender={joiner}
                isMe={true}
                sentAt={new Date().toISOString()}
                read={true}
              />
            );
          });
        })}
      </ul>
    </section>
  );
};

export default Lobby;
