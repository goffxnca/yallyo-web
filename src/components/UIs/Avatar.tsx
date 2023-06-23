import { getRandomColor } from "@/utils/color-utils";
import { convertFullnameToAbbr } from "@/utils/string-utils";
import { useEffect, useState } from "react";
import UserProfile from "../Users/UserProfile";
import Modal from "./Modal";
import { MicrophoneIcon } from "@heroicons/react/24/outline";

interface Props {
  userId: string;
  name: string;
  size: "xs" | "sm" | "md" | "lg";
  showMic: boolean;
  url: string;
  color: string;
}

const Avatar = ({ userId, name, size, showMic, url, color }: Props) => {
  const nameAbbr = name ? convertFullnameToAbbr(name) : "";
  const [bgColor, setBgColor] = useState("white");
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const avatarSize =
    size === "xs"
      ? "w-6 h-6"
      : size === "sm"
      ? "w-10 h-10"
      : size === "md"
      ? "w-16 h-16"
      : "w-24 h-24";

  useEffect(() => {
    const randomBgColor = getRandomColor();
    setBgColor(randomBgColor);
  }, []);
  return (
    <div
      className={`relative flex justify-center items-center text-white ${avatarSize} rounded-full ${
        name ? "" : "border border-dashed border-gray-600"
      }
       hover:scale-105 select-none cursor-pointer`}
      onClick={() => {
        if (name) {
          setShowProfile(true);
        }
      }}
      style={{
        backgroundColor: !url && name ? color : "",
        backgroundImage: url ? `url(${url})` : "",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      {/* Image */}
      <div></div>

      {/* Black Circle */}
      {name && !url && <div>{nameAbbr && <div>{nameAbbr}</div>}</div>}

      {showProfile && (
        <Modal
          showCloseButton={true}
          emitClose={() => {
            setShowProfile(false);
          }}
        >
          <UserProfile userId={userId} name={name} url={url} color={color} />
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
