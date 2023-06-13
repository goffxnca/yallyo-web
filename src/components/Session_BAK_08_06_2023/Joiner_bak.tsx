import { MicrophoneIcon } from "@heroicons/react/24/outline";
import Avatar from "../UIs/Avatar";
import { randomBoolean } from "@/utils/bool-utils";

interface Props {
  name: string;
  size: "sm" | "md" | "lg";
  url: string;
  color: string;
  bio: string;
  followers: number;
  followings: number;
  showMic: boolean;
  focused: boolean;
}

const Joiner = ({
  name,
  size,
  url,
  color,
  bio,
  followers,
  followings,
  focused,
}: Props) => {
  const micOn = randomBoolean();
  return (
    <div
      className={`bg-secondary p-4 w-40 rounded-md ${
        focused && "border-2 border-accent2"
      }`}
    >
      <div className="text-white flex justify-center">
        <Avatar
          name={name}
          size={size}
          showMic={true}
          url={url}
          color={color}
          bio=""
          followers={0}
          followings={0}
        />
      </div>

      <div className="flex items-center justify-center text-white mt-2">
        <div className="text-xs whitespace-nowrap overflow-hidden">{name}</div>
        {!micOn && (
          <div className="relative ml-1">
            <MicrophoneIcon className="w-4 h-4" />
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <div className="flex justify-center items-center w-full h-full">
                <div className={`border border-white w-8 rotate-45`}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Joiner;
