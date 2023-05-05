import { Room, RoomMessage } from "@/models/types";
// import { fetchRoomById } from "@/services/roomService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import {
  MicrophoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ComputerDesktopIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import Button from "../Uis/Button";
import {
  createRoomMessage,
  subscribeRoomMessages,
} from "@/services/roomMessageService";

const RoomDetail = () => {
  const [room, setRoom] = useState<Room | null>(null);
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
      <div className="md:w-2/3 p-5 md:relative border-r border-solid border-gray-200 bg-primary h-full">
        <Button text="Back" emitClick={() => {}} />
        <div className="flex justify-center">
          <div className="bg-blue-300 p-2 mx-1 rounded-md">
            <MicrophoneIcon className="w-6 h-6" />
          </div>
          <div className="bg-blue-300 p-2 mx-1 rounded-md">
            <VideoCameraIcon className="w-6 h-6" />
          </div>
          <div className="bg-[#1E272C] p-2 mx-1 rounded-md">
            <ComputerDesktopIcon className="w-6 h-6 text-white" />
          </div>
          <div className="bg-[#1E272C] p-2 mx-1 rounded-md">
            <LanguageIcon className="w-6 h-6 text-red-500" />
          </div>
          <div className="bg-[#1E272C] p-2 mx-1 rounded-md">
            <PhoneIcon className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <div className="absolute bottom-32 md:bottom-10 w-full">
          <div className="flex justify-center">
            <ul className="flex gap-2">
              {room?.joiners.map((joiner) => (
                <Avatar
                  key={joiner._id}
                  name={joiner.displayName}
                  size="lg"
                  showMic={true}
                  url=""
                  avatarColor={joiner.avatarColor}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="md:w-1/3 md:relative bg-gray-300">
        <div>
          {roomMessages.map((message: RoomMessage, index: number) => (
            <div key={index}>{message.message}</div>
          ))}
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="flex w-ful">
            <textarea
              className="w-full outline-none border-none text-sm "
              placeholder="Type a new message"
              spellCheck={false}
            />
            <div
              className="bg-secondary px-4 flex items-center cursor-pointer text-accent2"
              onClick={() => {
                createRoomMessage(roomId);
              }}
            >
              <RocketLaunchIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
