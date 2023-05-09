import { FireIcon } from "@heroicons/react/20/solid";
import {
  InformationCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

interface Props {
  onClickCreateRoom: Function;
  onClickGenRoom: Function; //TODO: Will be removed later
  onClickShowRules: Function;
}

const HeaderControls = ({
  onClickCreateRoom,
  onClickGenRoom,
  onClickShowRules,
}: Props) => {
  return (
    <div className="flex gap-x-4 justify-center md:justify-end">
      <div
        className="flex items-center text-white group cursor-pointer select-none bg-secondary p-2 rounded-lg"
        onClick={() => {
          onClickCreateRoom();
        }}
      >
        <PlusCircleIcon className="h-10 w-10 group-hover:text-accent2" />
        <span className="group-hover:text-accent2">New Room</span>
      </div>

      <div
        className="flex items-center text-white group cursor-pointer select-none bg-secondary p-2 rounded-lg"
        onClick={() => {
          onClickGenRoom();
        }}
      >
        <FireIcon className="h-10 w-10 group-hover:text-accent2" />
        <span className="group-hover:text-accent2">Gen Room</span>
      </div>

      <div
        className="flex items-center text-white group cursor-pointer select-none bg-secondary p-2 rounded-lg"
        onClick={() => {
          onClickShowRules();
        }}
      >
        <InformationCircleIcon className="h-10 w-10 group-hover:text-accent2" />
        <span className="group-hover:text-accent2">Community Rules</span>
      </div>
    </div>
  );
};

export default HeaderControls;
