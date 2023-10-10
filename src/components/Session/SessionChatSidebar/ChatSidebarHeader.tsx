import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { toggleLocalChat } from "@/store/sessionSlice";

const ChatSidebarHeader = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <div className="hidden bg-transparent lg:block h-14 lg:h-16"></div>
      <div className="w-full bg-secondary">
        <div
          className="text-white w-full py-3 lg:py-2"
          style={{
            borderBottom: 0.1,
            borderColor: "darkgray",
            borderStyle: "solid",
          }}
        >
          <div className="flex items-center relative">
            <div
              className="cursor-pointer z-20 hover:text-accent2 pl-2"
              onClick={() => {
                dispatch(toggleLocalChat());
              }}
            >
              <ChevronLeftIcon className="w-6 h-6 lg:hidden" />
              <ChevronRightIcon className="w-6 h-6 hidden lg:block" />
            </div>

            <div className="font-bold absolute flex justify-center w-full z-10">
              Chat
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebarHeader;
