import { RoomMessage } from "@/types/frontend";
import {
  MicrophoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const SessionChatSidebar = () => {
  const roomMessages: RoomMessage[] = [];
  return (
    <div className="md:w-1/3 md:relative bg-gray-300 flex items-center justify-center">
      <div>
        {/* {roomMessages.map((message: RoomMessage, index: number) => (
          <div key={index}>{message.message}</div>
        ))} */}
        <div className="text-secondary text-sm">Lets make some noise</div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="flex w-ful">
          <textarea
            className="w-full text-sm  border-none focus:ring-0 focus:border-transparent text-accent1"
            placeholder="Type a new message"
            spellCheck={false}
          />

          <div
            className="bg-secondary px-4 flex items-center cursor-pointer text-accent2"
            onClick={() => {
              //   createRoomMessage(roomId);
            }}
          >
            <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionChatSidebar;
