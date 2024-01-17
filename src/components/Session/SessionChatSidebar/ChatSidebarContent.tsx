import { ISessionEventMessage } from "@/types/common";
import ChatMessageItem from "../ChatMessageItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useRef } from "react";

interface Props {
  messages: ISessionEventMessage[];
}

const ChatSidebarContent = ({ messages }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesRef && messagesRef.current) {
        messagesRef.current.scrollTo({
          top: messagesRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    scrollToBottom();
  }, [messages.length]);

  if (!user) {
    return <div></div>;
  }
  return (
    <div
      className="flex-1 overflow-y-auto bg-secondary p-4"
      ref={messagesRef}
    >
      <ul className="space-y-2">
        {messages.map((message, index) => (
          <ChatMessageItem
            key={index}
            id={message.id}
            type={message.type}
            subType={message.subType}
            message={message.message}
            sender={message.sender}
            isMe={user.uid === message.sender._id}
            sentAt={message.sentAt}
            read={message.read}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebarContent;
