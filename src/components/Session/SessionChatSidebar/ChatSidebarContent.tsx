import { IChatMessage } from "@/types/common";
import ChatMessageItem from "../ChatMessageItem";

interface Props {
  messages: IChatMessage[];
}

const ChatSidebarContent = ({ messages }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto bg-secondary text-white p-4">
      <ul className="space-y-3">
        {messages.map((message, index) => (
          <ChatMessageItem
            key={index}
            message={message.message}
            fromMe={message.fromMe}
          />
        ))}
      </ul>
      {/* 
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
      <p>Heywefew</p> */}
    </div>
  );
};

export default ChatSidebarContent;
