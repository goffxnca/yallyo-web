import Friends from "@/components/Friends/Friends";
import PillItem from "@/components/Layouts/PillItem";
import RoomList from "@/components/RoomList";
import {
  addRooms,
  fetchRooms,
  fetchRooms2,
  subscribeRooms,
} from "@/services/roomService";
import { useEffect, useState } from "react";
import * as _ from "lodash";
import Header from "@/components/Layouts/Header";
import Modal from "@/components/Modals/Modal";
import NewRoomForm from "@/components/Forms/NewRoomForm";
import HeaderControls from "@/components/Layouts/HeaderControls";
import { UsersIcon } from "@heroicons/react/20/solid";
import Rules from "@/components/Rules";
import { Room } from "@/models/types";
import { getRandomItem } from "@/utils/array-utils";
import { ENVS, LANGAUGE_LEVEL, LANGUAGES, TOPICS } from "@/utils/constants";
import Head from "next/head";

const Home = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [showFriendPopup, setShowFriendPopup] = useState<boolean>(false);
  const [showNewRoomFormModal, setShowNewRoomFormModal] =
    useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);

  const [currentLang, setCurrentLang] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const rooms = fetchRooms();
  const languageGrouped = _.countBy(rooms, "language");
  const languagesList = Object.entries(languageGrouped);
  const [counter, setCounter] = useState(1);

  const toggleFriendsPopup = () => {
    setShowFriendPopup(!showFriendPopup);
  };

  useEffect(() => {
    const getRooms = async function getRooms() {
      const fetchedRooms = await fetchRooms2({
        pageNumber: currentPage,
        pageSize: 10,
      });
      const combinedRooms = rooms.concat(fetchedRooms);
      if (combinedRooms.length) {
        setRooms(combinedRooms);
        setFilteredRooms(combinedRooms);
        console.log("fetchRooms", fetchedRooms.length);
      }
    };

    getRooms();
  }, [currentPage]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("ranInterval")
  //     // getRooms();
  //   }, ENVS.ROOMS_REFRESH);

  //   return () => {
  //     console.log("clearInterval")
  //     clearInterval(interval);
  //   };
  // }, [])

  // useEffect(() => {
  //   // set up the subscription
  //   const unsubscribe = subscribeRooms((rooms: Room[]) => {
  //     setRooms(rooms);
  //     setFilteredRooms(rooms);
  //     // console.log("ROOMS RE-READ");
  //   });

  //   // return a cleanup function to unsubscribe when the component unmounts
  //   return () => {
  //     alert("unsub rooms");
  //     unsubscribe();
  //   };
  // }, []);

  const filterLanguage = () => {
    let filtered = rooms;

    if (currentLang) {
      filtered = filtered.filter((room) => room.language === currentLang);
    }

    if (currentLevel) {
      filtered = filtered.filter((room) => room.level === currentLevel);
    }

    if (currentTopic) {
      filtered = filtered.filter((room) => room.topic === currentTopic);
    }

    setFilteredRooms(filtered);
  };

  useEffect(() => {
    filterLanguage();
  }, [currentLang, currentLevel, currentTopic, rooms]);

  return (
    <main className="p-2 md:p-10 grid gap-y-6 bg-primary">
      <Head>
        <title>Practice English Online - HeyGuyz.com</title>
      </Head>

      <HeaderControls
        onClickCreateRoom={() => {
          addRooms(counter);
          // setShowNewRoomFormModal(true);
          setCounter(counter + 1);
        }}
        onClickShowRules={() => {
          setShowRules(true);
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
          {LANGAUGE_LEVEL.map((level, index) => (
            <PillItem
              key={index}
              title={level}
              active={level === currentLevel}
              onEmitSelect={setCurrentLevel}
            />
          ))}
        </div>

        <div className="flex items-center flex-wrap">
          <div className="text-white mr-2">Topics:</div>
          {TOPICS.map((topic, index) => (
            <PillItem
              key={index}
              title={topic}
              active={topic === currentTopic}
              onEmitSelect={setCurrentTopic}
            />
          ))}
        </div>
      </div>

      {/* <hr /> */}
      <RoomList rooms={filteredRooms}></RoomList>
      {showFriendPopup && (
        <Friends onEmitClose={() => setShowFriendPopup(false)} />
      )}
      {/* <div
        className="fixed bottom-0 right-2 md:right-10 bg-secondary px-4 py-1 rounded-t-lg  text-accent1 hover:text-accent2 border border-b-0 cursor-pointer select-none"
        onClick={toggleFriendsPopup}
      >
        <div className="flex gap-x-2 justify-center items-center">
          <UsersIcon className="h-5 w-5" />
          <span className="text-md">My Friends</span>
        </div>
      </div> */}

      {showNewRoomFormModal && (
        <Modal
          showCloseButton={true}
          emitClose={() => {
            setShowNewRoomFormModal(false);
          }}
        >
          <NewRoomForm onSubmit={(topic: string) => {}} />
        </Modal>
      )}

      {showRules && (
        <Modal
          showCloseButton={true}
          emitClose={() => {
            setShowRules(false);
          }}
        >
          <Rules />
        </Modal>
      )}
      <div className="text-white mx-auto">
        CurrentPage: {currentPage}
        <div
          className="cursor-pointer"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Load More...
        </div>
      </div>
    </main>
  );
};

export default Home;
