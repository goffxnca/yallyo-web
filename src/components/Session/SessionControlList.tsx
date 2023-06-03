import {
  toggleLocalCam,
  toggleChat,
  toggleMic,
  toggleShareScreen,
} from "@/store/sessionSlice";
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

interface Props {
  onToggleCam: Function;
  onToggleMic: Function;
}

const SessionControlList = ({ onToggleCam, onToggleMic }: Props) => {
  const { controls } = useSelector((state: RootState) => state.session);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center bg-secondary text-white rounded-md">
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
          onClick={() => {
            // dispatch(toggleLocalCam());
            onToggleCam(controls.camOn);
          }}
        />
        <SessionControlItem
          Icon={<ComputerDesktopIcon />}
          tooltip={
            controls.shareScreenOn ? "Stop Sharing Screen" : "Share Screen"
          }
          onClick={() => {
            dispatch(toggleShareScreen());
          }}
        />
        <SessionControlItem
          Icon={<ChatBubbleBottomCenterTextIcon />}
          // cross={!controls.chatOn}
          tooltip={controls.chatOn ? "Hide Chat Messags" : "Show Chat Messags"}
          onClick={() => {
            dispatch(toggleChat());
          }}
        />
        <SessionControlItem
          Icon={<PhoneIcon />}
          bgColor="bg-red-500"
          tooltip="Hang Up"
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
