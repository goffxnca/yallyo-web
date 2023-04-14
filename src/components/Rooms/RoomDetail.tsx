import { Room } from "@/models/types";
import { fetchRoomById } from "@/services/roomService";
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

const RoomDetail = () => {
  const [room, setRoom] = useState<Room>();
  const router = useRouter();

  useEffect(() => {
    const roomId = router.query?.id?.toString() || "";
    const fetchedRoom = fetchRoomById(roomId);
    setRoom(fetchedRoom);
  }, [router]);

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="w-2/3 p-5 relative border-r border-solid border-gray-200 bg-primary">
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
        <div className="absolute bottom-10 w-full">
          <div className="flex justify-center">
            <ul className="flex gap-2">
              {room?.joiners.map((joiner) => (
                <Avatar key={joiner} name={joiner} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-1/3 relative">
        <div className="absolute bottom-10 w-full p-2 border">
          <div className="flex w-full bg-red-200">
            <textarea
              className="w-full outline-none border-none"
              placeholder="Type a new message"
            />
            <div className="bg-accent1 p-2 flex items-center cursor-pointer">
              <RocketLaunchIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
