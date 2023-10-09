import { FireIcon } from "@heroicons/react/20/solid";
import Link from 'next/link'
import {
  InformationCircleIcon,
  PlusCircleIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

interface Props {
  onClickCreateRoom: Function;
  onClickShowRules: Function;
}

const HeaderControls = ({ onClickCreateRoom, onClickShowRules }: Props) => {
  return (
    <div className="flex gap-x-4 justify-center md:justify-end">
      <div
        className="flex items-center text-white group cursor-pointer select-none bg-secondary p-2 rounded-lg"
        onClick={() => {
          onClickCreateRoom();
        }}
      >
        <PlusCircleIcon className="h-7 w-7 m-1 group-hover:text-accent2" />
        <span className="group-hover:text-accent2">New Room</span>
      </div>

      <div
        className="flex items-center text-white group cursor-pointer select-none bg-secondary p-2 rounded-lg"
        onClick={() => {
          onClickShowRules();
        }}
      >
        <InformationCircleIcon className="h-7 w-7 m-1 group-hover:text-accent2" />
        <span className="group-hover:text-accent2">Community Rules</span>
      </div>

    <Link href={'/lobby'}>
      <div className="flex items-center text-white group cursor-pointer select-none bg-secondary p-2 rounded-lg if-desktop">
        <ChatBubbleBottomCenterIcon className="h-7 w-7 m-1 group-hover:text-accent2" />
        <span className="group-hover:text-accent2">Lobby Chat</span>
      </div>
    </Link>
    </div>
  );
};

export default HeaderControls;
