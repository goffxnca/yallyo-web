import { RoomMessage } from "@/types/frontend";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { UsersIcon } from "@heroicons/react/24/outline";
import Button from "../Forms/Button";
import {
  createRoomMessage,
  subscribeRoomMessages,
} from "@/services/roomMessageService";
import SessionControlList from "./SessionControlList";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SessionContent from "./SessionContent";
import SessionChatOverlayMobile from "./SessionChatOverlayMobile";

const RoomSession = () => {
  const { room, controls } = useSelector((state: RootState) => state.session);

  // const [room, setRoom] = useState<Room | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [roomMessages, setRoomMessages] = useState<RoomMessage[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getRoom = async () => {
      const roomId = router.query?.id?.toString() || "";
      if (roomId) {
        setRoomId(roomId);
        // const fetchedRoom = await fetchRoomById(roomId);
        // setRoom(fetchedRoom);
      }
    };

    getRoom();
  }, [router]);

  //We will workon realtime chat message later
  // useEffect(() => {
  //   let unsubscribe = () => {};
  //   // set up the subscription
  //   if (roomId) {
  //     unsubscribe = subscribeRoomMessages(roomId, (messagse: RoomMessage[]) => {
  //       setRoomMessages(messagse);
  //       console.log("ROOMS MESSAGES RE-READ");
  //     });
  //   }

  //   // return a cleanup function to unsubscribe when the component unmounts
  //   return () => {
  //     // alert("unsub ROOMS MESSAGES");
  //     unsubscribe();
  //   };
  // }, [roomId]);

  return (
    <div className="md:flex h-full">
      {/* Main Content */}
      <div className="w-full md:relative bg-primary h-full relative">
        <div className="flex py-4 justify-between px-4">
          <Button text="Back" emitClick={() => {}} />
          {room?.joiners && room.size && (
            <div className="flex items-center text-white">
              <UsersIcon className="h-5 w-5 mr-2" />
              <div>
                {room?.joiners.length} / {room?.size}
              </div>
            </div>
          )}
        </div>

        <SessionControlList />

        <SessionContent />
      </div>

      {/* {controls.chatOn && <SessionChatSidebar />} */}

      {controls.chatOn && <SessionChatOverlayMobile />}
    </div>
  );
};

export default RoomSession;
