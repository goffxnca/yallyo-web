import { toggleLocalChat } from "@/store/sessionSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  MicrophoneIcon,
  VideoCameraIcon,
  PhoneIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import SessionControlItem from "./SessionControlItem";
import { IMediaControls } from "@/types/common";

interface Props {
  controls: IMediaControls;
  onToggleCam: Function;
  onToggleMic: Function;
}

const SessionControlList = ({ controls, onToggleCam, onToggleMic }: Props) => {
  const { messages } = useSelector((state: RootState) => state.session);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex justify-center absolute top-20 left-0 right-0 z-20">
      <div className="flex items-center justify-center bg-secondary text-white rounded-md ">
        {/* <div className="text-white">{JSON.stringify(controls)}</div> */}
        <SessionControlItem
          Icon={<MicrophoneIcon />}
          disabled={!controls.micOn}
          tooltip={controls.micOn ? "Mute" : "Unmute"}
          onClick={() => {
            // dispatch(toggleLocalCam());
            onToggleMic(controls.micOn);
          }}
        />
        <SessionControlItem
          Icon={<VideoCameraIcon />}
          disabled={!controls.camOn}
          tooltip={controls.camOn ? "Cam Off" : "Cam On"}
          // onClick={() => {
          //   // dispatch(toggleLocalCam());
          //   onToggleCam(controls.camOn);
          // }}
        />
        <SessionControlItem
          Icon={<ComputerDesktopIcon />}
          disabled={true}
          tooltip={"Share screen feature is coming soon"}
          // onClick={() => {
          //   // dispatch(toggleShareScreen());
          // }}
        />
        <SessionControlItem
          Icon={<ChatBubbleBottomCenterTextIcon />}
          // cross={!controls.chatOn}
          // tooltip={controls.chatOn ? "Hide Chat Messags" : "Show Chat Messags"}
          pendingNum={messages.filter((message) => !message.read).length}
          onClick={() => {
            dispatch(toggleLocalChat());
          }}
        />
        <SessionControlItem
          Icon={<PhoneIcon />}
          bgColor="bg-red-500"
          tooltip="Hang Up"
          onClick={() => {
            window.location.href = "/feedback/session-leave";
          }}
        />

        {/* <div className="p-2 mx-1 rounded-md relative cursor-pointer">
          <MicrophoneIcon className="w-6 h-6" />
          <div className="absolute top-[50%] left-0 border border-white w-10 rotate-45"></div>
        </div> */}
        {/* <div className="p-3 mx-1 rounded-md">
          <VideoCameraIcon className="w-6 h-6" />
        </div>
        <div className="bg-secondary p-3 mx-1 rounded-md">
          <ComputerDesktopIcon className="w-6 h-6 text-white" />
        </div> */}
        {/* <div
          className="bg-secondary p-3 mx-1 rounded-md cursor-pointer"
          onClick={() => {
            dispatch(toggleChat());
          }}
        >
          <ChatBubbleLeftIcon className="w-6 h-6 text-white" />
        </div> */}
        {/* <div className="bg-red-500 p-3">
          <PhoneIcon className="w-6 h-6 text-white" />
        </div> */}
      </div>
    </div>
  );
};

export default SessionControlList;
