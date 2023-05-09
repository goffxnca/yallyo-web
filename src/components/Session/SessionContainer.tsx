import { Room, RoomMessage } from "@/models/types";
// import { fetchRoomById } from "@/services/roomService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Avatar from "../UIs/Avatar";

import {
  MicrophoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ComputerDesktopIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import Button from "../Forms/Button";
import {
  createRoomMessage,
  subscribeRoomMessages,
} from "@/services/roomMessageService";
import SessionControls from "./SessionControls";
import SessionChatSidebar from "./SessionChatSidebar";
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

  useEffect(() => {
    let unsubscribe = () => {};
    // set up the subscription
    if (roomId) {
      unsubscribe = subscribeRoomMessages(roomId, (messagse: RoomMessage[]) => {
        setRoomMessages(messagse);
        console.log("ROOMS MESSAGES RE-READ");
      });
    }

    // return a cleanup function to unsubscribe when the component unmounts
    return () => {
      // alert("unsub ROOMS MESSAGES");
      unsubscribe();
    };
  }, [roomId]);

  return (
    <div className="md:flex h-full">
      {/* Main Content */}
      <div className="w-full md:relative bg-primary h-full relative">
        <div className="py-4 pl-4">
          <Button text="Back" emitClick={() => {}} />
        </div>

        <SessionControls />

        <SessionContent />
      </div>

      {/* {controls.chatOn && <SessionChatSidebar />} */}

      {controls.chatOn && <SessionChatOverlayMobile />}
    </div>
  );
};

export default RoomSession;
