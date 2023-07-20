import { ILobbyChat } from "@/types/common";
import Avatar from "../UIs/Avatar";

interface Props extends ILobbyChat {}

const LobbyChatItem = ({ message, type, sender }: Props) => {
  return (
    <li className="flex items-center">
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

      <div className={`px-3 py-1 break-words text-primary min-w-[200px]`}>
        <div className="">
          <span className={`text-sm font-bold`} style={{ color: sender.color }}>
            {sender.dname}
          </span>
          <span className={`text-sm  text-white`}>:</span>
          <span className={`text-sm  text-white ml-2`}>{message}</span>
        </div>
      </div>
    </li>
  );
};

export default LobbyChatItem;
