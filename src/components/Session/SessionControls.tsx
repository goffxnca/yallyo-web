import { toggleChat } from "@/store/sessionSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  MicrophoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PhoneIcon,
  RocketLaunchIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

const SessionControls = ({}) => {
  console.log("SessionControls");
  const { room, controls } = useSelector((state: RootState) => state.session);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex justify-center">
      {/* <div className="text-white">{JSON.stringify(controls)}</div> */}
      <div className="bg-blue-300 p-2 mx-1 rounded-md">
        <MicrophoneIcon className="w-6 h-6" />
      </div>
      <div className="bg-blue-300 p-2 mx-1 rounded-md">
        <VideoCameraIcon className="w-6 h-6" />
      </div>
      <div className="bg-[#1E272C] p-2 mx-1 rounded-md">
        <ComputerDesktopIcon className="w-6 h-6 text-white" />
      </div>
      <div
        className="bg-secondary p-2 mx-1 rounded-md cursor-pointer"
        onClick={() => {
          dispatch(toggleChat());
        }}
      >
        <ChatBubbleLeftIcon className="w-6 h-6 text-white" />
      </div>
      <div className="bg-secondary p-2 mx-1 rounded-md">
        <LanguageIcon className="w-6 h-6 text-red-500" />
      </div>
      <div className="bg-secondary p-2 mx-1 rounded-md">
        <PhoneIcon className="w-6 h-6 text-red-500" />
      </div>
    </div>
  );
};

export default SessionControls;
