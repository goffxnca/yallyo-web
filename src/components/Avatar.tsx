import { Room } from "@/models/types";
import { getRandomColor } from "@/utils/color-utils";
import { convertFullnameToAbbr } from "@/utils/string-utils";
import { useEffect, useState } from "react";

interface Props {
  name: string;
}

const Avatar = ({ name }: Props) => {
  const nameAbbr = convertFullnameToAbbr(name);
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const randomBgColor = getRandomColor();
    setBgColor(randomBgColor);
  }, []);
  return (
    <li
      className={`flex justify-center items-center text-white w-24 h-24  rounded-full border border-dashed border-gray-600`}
      style={{ backgroundColor: bgColor }}
    >
      <div>{nameAbbr}</div>
    </li>
  );
};

export default Avatar;
