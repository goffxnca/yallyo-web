import ChatMessageItem from "./ChatMessageItem";

const ChatMessageList = () => {
  const messages = [
    { message: "Hey How are you", side: "left" },
    { message: "I'm good", side: "right" },
    { message: "Where are you going today?", side: "right" },
    { message: "I gonna go shopping", side: "left" },
  ];

  return (
    <ul className="">
      {/* {messages.map((message, index) => (
        <ChatMessageItem key={index} message={message.message} isMe={false} sentAt="somedate" id="" sender={message.se} >
      ))} */}
      <li></li>
    </ul>
  );
};

export default ChatMessageList;
