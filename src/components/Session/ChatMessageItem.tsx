import { IChatMessage } from "@/types/common";
import Avatar from "../UIs/Avatar";

interface Props extends IChatMessage {}

const ChatMessageItem = ({ message, sender, isMe, sentAt }: Props) => {
  const roundStyle = !isMe
    ? "rounded-r-lg rounded-tl-lg"
    : "rounded-l-lg rounded-tr-lg";
  return (
    <li className="flex items-center">
      {!isMe && (
        <div className="mr-2">
          <Avatar
            name={"wefew"}
            size={"xs"}
            showMic={true}
            url={sender.photoURL}
            color={"red"}
            bio=""
            followers={0}
            followings={0}
          />
        </div>
      )}

      <div
        className={`px-3 py-2 shadow max-w-[300px] break-words ${
          isMe
            ? "ml-auto bg-blue-500"
            : "bg-gray-300 text-primary min-w-[200px]"
        } ${roundStyle}`}
      >
        <div
          className={`flex justify-between text-[10px] ${
            isMe ? "text-gray-200" : "text-gray-500"
          }`}
        >
          <div className="">{isMe ? "" : sender.dname}</div>
          <div className="">{sentAt}</div>
        </div>

        <div className={`text-sm`}>{message}</div>
      </div>
    </li>
  );
};

export default ChatMessageItem;
