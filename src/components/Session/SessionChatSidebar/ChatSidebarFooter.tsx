import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface Props {
  onSendMessage: Function;
}

const ChatSidebarFooter = ({ onSendMessage }: Props) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessage("");
    onSendMessage(message);
  };

  return (
    <div
      className="w-full bg-secondary"
      style={{
        borderTop: 1,
        borderColor: "darkgray",
        borderStyle: "solid",
      }}
    >
      <div className="flex items-center p-4 space-x-1 bg-primary lg:bg-transparent">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="reset"
            className="w-full text-base border-none focus:ring-0 focus:border-transparent text-secondary rounded-lg"
            placeholder="Type a new message"
            spellCheck="false"
            value={message}
            onChange={handleChange}
          ></input>
        </form>

        <div
          className="bg-white p-4 flex items-center cursor-pointer text-accent1 rounded-lg"
          onClick={() => {
            onSendMessage(message);
          }}
        >
          <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebarFooter;
