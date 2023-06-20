import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

interface Props {
  onSendMessage: Function;
}

const ChatSidebarFooter = ({ onSendMessage }: Props) => {
  const [message, setMessage] = useState("");
  const textboxRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const message = textboxRef.current?.value;
    if (message) {
      onSendMessage(textboxRef.current?.value);
      textboxRef.current.value = "";
    }
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
            type="text"
            className="w-full text-base border-none focus:ring-0 focus:border-transparent text-secondary rounded-lg"
            placeholder="Type a new message"
            spellCheck="false"
            ref={textboxRef}
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
