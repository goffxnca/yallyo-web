import { getRandomColor } from "@/utils/color-utils";
import { convertFullnameToAbbr } from "@/utils/string-utils";
import { useEffect, useState } from "react";
import UserProfile from "./Users/UserProfile";
import Modal from "./Modals/Modal";

interface Props {
  name: string;
  size: "sm" | "md" | "lg";
}

const Avatar = ({ name, size }: Props) => {
  const nameAbbr = convertFullnameToAbbr(name);
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
      className={`flex justify-center items-center text-white ${avatarSize} rounded-full border border-dashed border-gray-600 hover:scale-105 select-none cursor-pointer`}
      style={{ color: bgColor }}
      onClick={() => {
        setShowProfile(true);
      }}
    >
      <div>{nameAbbr}</div>
      {showProfile && (
        <Modal
          showCloseButton={true}
          emitClose={() => {
            setShowProfile(false);
          }}
        >
          <UserProfile />
        </Modal>
      )}
    </li>
  );
};

export default Avatar;
