import { ILobbyChat } from "@/types/common";
import Avatar from "../UIs/Avatar";
import { formatDateTo12Hour } from "@/utils/date-utils";

interface Props extends ILobbyChat {}

const LobbyChatItem = ({ message, type, sender, createdAt }: Props) => {
  return (
    <li className="flex items-center hover:bg-primary py-1 px-2 rounded-md">
      <div className="">
        <Avatar
          userId={sender._id}
          name={sender.dname}
          size={"xs"}
          url={sender.photoURL}
          color={sender.color}
          hilight={false}
        />
      </div>

      <div className={`px-3 py-1 break-words flex-1`}>
        <div className="">
          <span className={`text-sm font-bold`} style={{ color: sender.color }}>
            {sender.dname}
          </span>
          <span className={`text-sm`}>:</span>
          <span className={`text-sm ml-2`}>{message}</span>
        </div>
      </div>

      <div className="text-[10px] text-gray-500 w-12 ml-auto text-right">
        {formatDateTo12Hour(new Date(createdAt))}
      </div>
    </li>
  );
};

export default LobbyChatItem;
