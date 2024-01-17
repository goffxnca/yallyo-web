import { getRandomColor } from "@/utils/color-utils";
import { convertFullnameToAbbr } from "@/utils/string-utils";
import { useEffect, useState } from "react";
import UserProfile from "../Users/UserProfile";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { resetAccount } from "@/store/accountSlice";

interface Props {
  userId: string;
  name: string;
  size: "xs" | "sm" | "md" | "lg";
  url: string;
  color: string;
  hilight: boolean;
  clickable?: boolean;
}

const Avatar = ({
  userId,
  name,
  size,
  url,
  color,
  hilight,
  clickable = true,
}: Props) => {
  const nameAbbr = name ? convertFullnameToAbbr(name) : "";
  const [bgColor, setBgColor] = useState("white");
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const avatarSize =
    size === "xs"
      ? "w-8 h-8"
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
      className={`relative flex justify-center items-center text-white ${avatarSize} ${
        hilight && "scale-125"
      } rounded-full ${name ? "" : "border border-dashed border-gray-600"}
       hover:scale-110 select-none cursor-pointer ${
         hilight && "border-4 border-accent2"
       }`}
      onClick={() => {
        if (name) {
          setShowProfile(true);
        }
      }}
      style={{
        backgroundColor: !url && name ? color : "",
        backgroundImage: url ? `url(${url})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Image */}
      <div></div>

      {/* Black Circle */}
      {name && !url && <div>{nameAbbr && <div>{nameAbbr}</div>}</div>}

      {clickable && showProfile && (
        <Modal
          emitClose={() => {
            setShowProfile(false);
            dispatch(resetAccount());
          }}
        >
          <UserProfile userId={userId} name={name} color={color} url={url} />
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
