import { toggleLocalChat } from "@/store/sessionSlice";
import { AppDispatch } from "@/store/store";
import { IRoomMessage } from "@/types/frontend";
import {
  PaperAirplaneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

const SessionChatSidebar = () => {
  const roomMessages: IRoomMessage[] = [];
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 w-full lg:relative  lg:w-[350px] z-40 lg:z-20">
      <div className="flex flex-col h-screen">
        <div className="hidden lg:block h-12 bg-transparent"></div>
        <div className="w-full bg-secondary">
          <div
            className=" text-white  w-full py-2"
            style={{
              borderBottom: 0.1,
              borderColor: "darkgray",
              borderStyle: "solid",
            }}
          >
            <div className="flex items-center relative">
              <div
                className="cursor-pointer z-20 hover:text-accent2"
                onClick={() => {
                  dispatch(toggleLocalChat());
                }}
              >
                <ChevronLeftIcon className="w-6 h-6 lg:hidden" />
                <ChevronRightIcon className="w-6 h-6 hidden lg:block" />
              </div>

              <div className="text-white font-bold absolute flex justify-center w-full z-10">
                Chat Messages
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-secondary text-white p-4">
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
          <p>Heywefew</p>
        </div>
        <div className="w-full bg-green-200">
          <div className="flex">
            <textarea
              className="w-full text-sm border-none focus:ring-0 focus:border-transparent text-accent1 resize-none h-10"
              placeholder="Type a new message"
              spellCheck="false"
            ></textarea>

            <div
              className="bg-accent2 px-4 flex items-center cursor-pointer text-black"
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

export default SessionChatSidebar;
