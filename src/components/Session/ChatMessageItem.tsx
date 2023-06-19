import Avatar from "../UIs/Avatar";

interface Props {
  message: string;
  fromMe: boolean;
}
const ChatMessageItem = ({ message, fromMe }: Props) => {
  const roundStyle = !fromMe
    ? "rounded-r-lg rounded-tl-lg"
    : "rounded-l-lg rounded-tr-lg";
  return (
    <li className="flex items-center">
      {!fromMe && (
        <div className="mr-2">
          <Avatar
            name={"wefew"}
            size={"xs"}
            showMic={true}
            url={
              "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/809.jpg"
            }
            color={"red"}
            bio=""
            followers={0}
            followings={0}
          />
        </div>
      )}

      <div
        className={`px-3 shadow w-[80%] ${
          fromMe ? "ml-auto bg-blue-500" : "bg-gray-300 text-primary"
        } ${roundStyle}`}
      >
        <div className={`py-2 text-sm `}>{message}</div>
      </div>
    </li>
  );
};

export default ChatMessageItem;
