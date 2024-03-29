import ChatMessageItem from "./ChatMessageItem_bak";

const ChatMessageList = () => {
  const messages = [
    { message: "Hey How are you", side: "left" },
    { message: "I'm good", side: "right" },
    { message: "Where are you going today?", side: "right" },
    { message: "I gonna go shopping", side: "left" },
  ];

  return (
    <ul className="">
      {messages.map((message, index) => (
        <ChatMessageItem
          key={index}
          message={message.message}
          side={message.side}
        />
      ))}
    </ul>
  );
};

export default ChatMessageList;
