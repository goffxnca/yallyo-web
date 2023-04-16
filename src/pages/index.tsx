import Friends from "@/components/Friends/Friends";
import PillItem from "@/components/Layouts/PillItem";
import RoomList from "@/components/RoomList";
import { fetchRooms, addRoom } from "@/services/roomService";
import { useState } from "react";
import * as _ from "lodash";
import Header from "@/components/Layouts/Header";
import Modal from "@/components/Modals/Modal";
import NewRoomForm from "@/components/Forms/NewRoomForm";
import HeaderControls from "@/components/Layouts/HeaderControls";
import { UsersIcon } from "@heroicons/react/20/solid";

const Home = () => {
  const [showFriendPopup, setShowFriendPopup] = useState<boolean>(false);
  const [showNewRoomFormModal, setShowNewRoomFormModal] =
    useState<boolean>(false);
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

  const topics = [
    { id: "t1", name: "Football" },
    { id: "t2", name: "K-Pop" },
    { id: "t3", name: "Politics" },
    { id: "t4", name: "T-POP" },
    { id: "t5", name: "Series" },
    { id: "t6", name: "Art" },
    { id: "t7", name: "Football" },
    { id: "t8", name: "Tiktok" },
    { id: "t9", name: "Shorts" },
    { id: "t10", name: "Relax" },
    { id: "t11", name: "English" },
    { id: "t12", name: "Travel" },
    { id: "t13", name: "Technology" },
    { id: "t14", name: "Blockchai" },
    { id: "t15", name: "Web Devs" },
    { id: "t16", name: "Gadgets" },
    { id: "t17", name: "Movies" },
    { id: "t18", name: "Celebrities" },
    { id: "t19", name: "Nature" },
  ];

  const toggleFriendsPopup = () => {
    setShowFriendPopup(!showFriendPopup);
  };

  return (
    <main className="p-2 md:p-10 grid gap-y-6 bg-primary">
      <HeaderControls
        onClickCreateRoom={() => {
          setShowNewRoomFormModal(true);
        }}
      />
      {/* <hr /> */}
      <div>
        <div className="flex flex-wrap items-center">
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

        <div className="flex items-center flex-wrap">
          <div className="text-white mr-2">Topics:</div>
          {topics.map((topic) => (
            <PillItem
              key={topic.id}
              title={topic.name}
              active={topic.name === currentLevel}
              onEmitSelect={setCurrentLevel}
            />
          ))}
        </div>
      </div>

      {/* <hr /> */}
      <RoomList rooms={rooms}></RoomList>
      {showFriendPopup && (
        <Friends onEmitClose={() => setShowFriendPopup(false)} />
      )}
      <div
        className="fixed bottom-0 right-2 md:right-10 bg-secondary px-4 py-1 rounded-t-lg  text-accent1 hover:text-accent2 border border-b-0 cursor-pointer select-none"
        onClick={toggleFriendsPopup}
      >
        <div className="flex gap-x-2 justify-center items-center">
          <UsersIcon className="h-5 w-5" />
          <span className="text-md">My Friends</span>
        </div>
      </div>

      {showNewRoomFormModal && (
        <Modal
          showCloseButton={true}
          emitClose={() => {
            setShowNewRoomFormModal(false);
          }}
        >
          <NewRoomForm
            onSubmit={(topic: string) => {
              addRoom({
                id: "cokwf",
                desc: topic,
                language: "Frence",
                level: "",
                joiners: [],
              });
            }}
          />
        </Modal>
      )}
    </main>
  );
};

export default Home;
