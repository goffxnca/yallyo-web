import { toggleLocalChat } from "@/store/sessionSlice";
import { AppDispatch } from "@/store/store";
import { IRoomMessage } from "@/types/frontend";
import {
  MicrophoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  PaperAirplaneIcon,
  BackwardIcon,
  BackspaceIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

const SessionChatSidebar = () => {
  const roomMessages: IRoomMessage[] = [];
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="the-container absolute left-0 right-0 top-0 lg:top-12 bottom-0 lg:relative lg:w-[350px] h-screen w-full bg-green-300 flex items-center justify-center">
      <div className="relative h-full w-full bg-gray-300 z-[60] lg:z-20">
        {/* <div className="sidebar w-full md:relative items-center justify-center ">
          <div className="w-full ">
            {roomMessages.map((message: RoomMessage, index: number) => (
          <div key={index}>{message.message}</div>
        ))}
            <div className="text-secondary text-sm">Lets make some noise</div>
          </div>
        </div> */}

        {/* Header */}
        <div
          className=" text-white border-b border-red-300 w-full py-2"
          onClick={() => {
            dispatch(toggleLocalChat());
          }}
        >
          <div className="flex items-center relative">
            <ChevronLeftIcon className="w-6 h-6 lg:hidden cursor-pointer" />
            <ChevronRightIcon className="w-6 h-6 hidden lg:block cursor-pointer" />

            <div className="text-white font-bold absolute flex justify-center w-full">
              Chat Messages
            </div>
          </div>
        </div>

        {/* Content */}

        <div className="h-20 w-full">Header</div>
        <div className="">Main Content</div>
        <div className="h-20 w-full">Footer</div>

        {/* Footer */}
        {/* <div className="absolute bottom-0 w-full">
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
</div> */}
      </div>
    </div>
  );
};

export default SessionChatSidebar;
