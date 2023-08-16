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
  onToggleScreen: Function;
}

const SessionControlList = ({
  controls,
  onToggleCam,
  onToggleMic,
  onToggleScreen,
}: Props) => {
  const { messages, room, localControls } = useSelector(
    (state: RootState) => state.session
  );

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex justify-center absolute top-20 left-0 right-0 z-20">
      <div className="flex items-center justify-center bg-secondary text-white rounded-md ">
        {/* <div className="text-white">{JSON.stringify(controls)}</div> */}

        {room && room.features && (
          <>
            {room.features.audio && (
              <SessionControlItem
                Icon={<MicrophoneIcon />}
                disabled={!controls.micOn}
                hoverTooltip={controls.micOn ? "Mute" : "Unmute"}
                actionedTooltip={controls.micOn ? "Unmuted" : "Muted"}
                onClick={() => {
                  // dispatch(toggleLocalCam());
                  onToggleMic(controls.micOn);
                }}
              />
            )}

            {room.features.video && (
              <SessionControlItem
                Icon={<VideoCameraIcon />}
                disabled={!controls.camOn}
                hoverTooltip={controls.camOn ? "Camera Off" : "Camera On"}
                actionedTooltip={controls.camOn ? "Camera On" : "Camera Off"}
                // tooltip={"Camera feature is coming soon"}
                onClick={() => {
                  // dispatch(toggleLocalCam());
                  onToggleCam(controls.camOn);
                }}
              />
            )}

            {room.features.chat && (
              <SessionControlItem
                Icon={<ChatBubbleBottomCenterTextIcon />}
                // cross={!controls.chatOn}
                hoverTooltip={localControls.chatOn ? "Hide Chat" : "Show Chat"}
                // mobileTooltip={localControls.chatOn ? "Show Chat" : "Hide Chat"}
                pendingNum={messages.filter((message) => !message.read).length}
                onClick={() => {
                  dispatch(toggleLocalChat());
                }}
              />
            )}

            <SessionControlItem
              Icon={<ComputerDesktopIcon />}
              hoverTooltip={
                localControls.chatOn ? "Stop Sharing Screen" : "Share Screen"
              }
              actionedTooltip={
                controls.camOn ? "Sharing Screen" : "Sharing Screen Stopped"
              }
              onClick={() => {
                onToggleScreen();
              }}
            />
          </>
        )}

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

      <SessionControlItem
        Icon={<PhoneIcon />}
        bgClasses="bg-red-500 ml-4 text-white"
        hoverTooltip="Hang Up"
        onClick={() => {
          if (confirm("Are you sure to leave this room?")) {
            window.location.href = "/feedback/session-leave";
          }
        }}
      />
    </div>
  );
};

export default SessionControlList;
