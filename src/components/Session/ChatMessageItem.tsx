import { ISessionEventMessage } from "@/types/common";
import Avatar from "../UIs/Avatar";
import {
  ArrowRightOnRectangleIcon,
  PhoneXMarkIcon,
} from "@heroicons/react/24/outline";

interface Props extends ISessionEventMessage {}

const ChatMessageItem = ({
  type,
  subType,
  message,
  sender,
  isMe,
  sentAt,
}: Props) => {
  const roundStyle = !isMe
    ? "rounded-r-lg rounded-tl-lg"
    : "rounded-l-lg rounded-tr-lg";
  return (
    <li className="flex items-center">
      {!isMe && type === "chat" && (
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

      {type === "chat" && (
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
      )}

      {type === "event" && (
        <div
          className={`px-3 py-2 shadow max-w-[300px] break-words mx-auto rounded-lg text-[12px]`}
        >
          <div className=" text-center">{sentAt}</div>
          <div className="flex gap-x-2">
            {subType === "join" && (
              <ArrowRightOnRectangleIcon className="w-5 h-5 text-accent1" />
            )}
            {subType === "leave" && (
              <PhoneXMarkIcon className="w-5 h-5 text-accent1" />
            )}

            <div className={`text-accent1 italic`}>{message}</div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ChatMessageItem;
