import { useSelector } from "react-redux";
import Avatar from "../UIs/Avatar";
import { RootState } from "@/store/store";
import exp from "constants";
import Joiner from "./Joiner";
import { useEffect, useState } from "react";
import { getRandomItem } from "@/utils/array-utils";

const SessionContent = () => {
  const { room, controls } = useSelector((state: RootState) => state.session);
  const [focused, setFocused] = useState<string>();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (room?.joiners) {
      interval = setInterval(() => {
        const userToBeFocused = getRandomItem(room?.joiners || []);
        console.log(userToBeFocused);
        setFocused(userToBeFocused?._id || "");
      }, 60000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [room?.joiners]);

  return (
    <div className="absolute bottom-10 w-full">
      {/* <div className="text-white">{focused}</div> */}
      <div className="flex justify-center">
        <ul className="flex gap-2 flex-wrap justify-center max-w-[900px]">
          {room?.joiners.map((joiner) => (
            <Joiner
              key={joiner._id}
              name={joiner.dname}
              size={room.joiners.length > 5 ? "md" : "lg"}
              url={joiner.photoURL}
              color={joiner.color}
              bio=""
              followers={0}
              followings={0}
              showMic={true}
              focused={focused === joiner._id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SessionContent;
