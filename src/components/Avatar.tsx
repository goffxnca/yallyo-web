import { getRandomColor } from "@/utils/color-utils";
import { convertFullnameToAbbr } from "@/utils/string-utils";
import { useEffect, useState } from "react";
import UserProfile from "./Users/UserProfile";
import Modal from "./Modals/Modal";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { random } from "lodash";

interface Props {
  name: string;
  size: "sm" | "md" | "lg";
  showMic: boolean;
  url: string;
}

const Avatar = ({ name, size, showMic, url }: Props) => {
  const nameAbbr = name ? convertFullnameToAbbr(name) : "";
  const [bgColor, setBgColor] = useState("white");
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const avatarSize =
    size === "sm" ? "w-10 h-10" : size === "md" ? "w-16 h-16" : "w-24 h-24";

  useEffect(() => {
    const randomBgColor = getRandomColor();
    setBgColor(randomBgColor);
  }, []);
  return (
    <li
      className={`relative flex justify-center items-center text-white ${avatarSize} rounded-full ${
        name ? "" : "border border-dashed border-gray-600"
      }
       hover:scale-105 select-none cursor-pointer`}
      onClick={() => {
        setShowProfile(true);
      }}
      style={{
        backgroundColor: !url && name ? getRandomColor() : "",
        backgroundImage: url ? `url(${url})` : "",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      {/* Image */}
      <div></div>

      {/* Black Circle */}
      {name && !url && <div>{nameAbbr && <div>{nameAbbr}</div>}</div>}

      {showMic && (
        <div className="absolute right-2 bottom-2 p-2 mx-1 rounded-md ">
          <MicrophoneIcon className="w-6 h-6 " />
        </div>
      )}

      {showProfile && (
        <Modal
          showCloseButton={true}
          emitClose={() => {
            setShowProfile(false);
          }}
        >
          <UserProfile name={name} bio="" url={url} />
        </Modal>
      )}
    </li>
  );
};

export default Avatar;
