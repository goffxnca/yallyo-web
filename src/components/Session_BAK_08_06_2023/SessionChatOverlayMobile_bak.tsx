import { IRoomMessage } from "@/types/frontend";
import { toggleLocalChat } from "@/store/sessionSlice";
import { AppDispatch, RootState } from "@/store/store";

import {
  MicrophoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import ChatMessageList from "./ChatMessageList_bak";

const SessionChatOverlayMobile = () => {
  const dispatch: AppDispatch = useDispatch();
  //   const { room, controls } = useSelector((state: RootState) => state.session);
  const roomMessages: IRoomMessage[] = [];
  return (
    <div className="chat-mobile">
      <div className="">
        <div className="absolute right-1 top-1 md:hidden">
          <XMarkIcon
            className="h-8 w-8 cursor-pointer hover:scale-110 text-white"
            onClick={() => {
              dispatch(toggleLocalChat());
            }}
          />
        </div>

        <div className="p-2">
          <ChatMessageList />
        </div>

        <div className="absolute left-2 right-2 bottom-2">
          <div className="flex w-ful">
            <textarea
              className="w-full text-sm  border-none focus:ring-0 focus:border-transparent text-accent1 rounded-l-md"
              placeholder="Type a new message"
              spellCheck={false}
            />

            <div
              className="bg-primary md:bg-secondary px-4 flex items-center cursor-pointer text-accent2  rounded-r-md"
              onClick={() => {
                //   createRoomMessage(roomId);
              }}
            >
              <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionChatOverlayMobile;
