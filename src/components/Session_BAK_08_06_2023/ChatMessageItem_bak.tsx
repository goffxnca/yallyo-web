interface Props {
  message: string;
  side: string;
}
const ChatMessageItem = ({ message, side }: Props) => {
  const roundStyle =
    side === "left"
      ? "rounded-r-lg rounded-tl-lg"
      : "rounded-l-lg rounded-tr-lg";
  return (
    <li className={`my-1 ${side === "right" && "text-right"}`}>
      <span
        className={` bg-white px-3 py-1 text-sm text-gray-500 w-auto shadow ${roundStyle} ml-auto`}
      >
        {message}
      </span>
    </li>
  );
};

export default ChatMessageItem;
