import Friends from "@/components/Friends/Friends";
import PillItem from "@/components/Layouts/PillItem";
import RoomList from "@/components/RoomList";
import { fetchRooms } from "@/services/roomService";
import Image from "next/image";
import { useState } from "react";
import * as _ from "lodash";
import Header from "@/components/Layouts/Header";

const Home = () => {
  const [showFriendPopup, setShowFriendPopup] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");

  const rooms = fetchRooms();
  const languageGrouped = _.countBy(rooms, "language");
  const languagesList = Object.entries(languageGrouped);
  const levels = [
    { id: "l1", name: "Beginner" },
    { id: "l2", name: "Pre-Intermediate" },
    { id: "l3", name: "Intermediate" },
    { id: "l4", name: "Upper Intermediate" },
    { id: "l5", name: "Advanced" },
    { id: "l6", name: "Proficient" },
  ];

  return (
    <main className="p-10 grid gap-y-6 bg-primary">
      <div>
        <div className="flex items-center">
          {/* <div className="text-white">
          {currentLang} {currentLevel}
        </div> */}
          <div className="text-white mr-2">Languages:</div>
          {languagesList.map((lang) => (
            <PillItem
              key={lang[0]}
              title={lang[0]}
              count={lang[1]}
              active={lang[0] === currentLang}
              onEmitSelect={setCurrentLang}
            />
          ))}
        </div>

        <div className="flex items-center flex-wrap">
          <div className="text-white mr-2">Levels:</div>
          {levels.map((level) => (
            <PillItem
              key={level.id}
              title={level.name}
              active={level.name === currentLevel}
              onEmitSelect={setCurrentLevel}
            />
          ))}
        </div>
      </div>

      <RoomList rooms={rooms}></RoomList>
      {showFriendPopup && (
        <Friends onEmitClose={() => setShowFriendPopup(false)} />
      )}
      <button
        className=" fixed bottom-0 right-0 text-white"
        onClick={() => setShowFriendPopup(true)}
      >
        Show Friend
      </button>
    </main>
  );
};

export default Home;
