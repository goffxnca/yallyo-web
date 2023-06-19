import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const ChatSidebarFooter = () => {
  return (
    <div className="w-full bg-secondary">
      <div className="flex p-4 space-x-1">
        <textarea
          className="w-full text-sm border-none focus:ring-0 focus:border-transparent text-secondary h-10 resize-none  rounded-lg"
          placeholder="Type a new message"
          spellCheck="false"
        ></textarea>

        <div
          className="bg-accent2 px-4 flex items-center cursor-pointer text-black rounded-lg"
          onClick={() => {
            //   createRoomMessage(roomId);
          }}
        >
          <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebarFooter;
