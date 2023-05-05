import Friends from "@/components/Friends/Friends";
import PillItem from "@/components/Layouts/PillItem";
import RoomList from "@/components/RoomList";
import { addRooms } from "@/services/roomService";
import { useEffect, useRef, useState } from "react";

import Modal from "@/components/Modals/Modal";
import NewRoomForm from "@/components/Forms/NewRoomForm";
import HeaderControls from "@/components/Layouts/HeaderControls";
import Rules from "@/components/Rules";
import { Room } from "@/models/types";
import { ENVS, LANGAUGE_LEVEL, TOPICS } from "@/utils/constants";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, fetchRoomsGroupedByLanguage } from "@/store/roomSlice";
import { AppDispatch, RootState } from "@/store/store";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { subscribeRoomsUpdates } from "@/subscription";
import * as _ from "lodash";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const HomePage = () => {
  console.log("HomePage");
  const { rooms, roomsGroupedByLanguage, status, canLoadMore } = useSelector(
    (state: RootState) => state.room
  );

  const dispatch: AppDispatch = useDispatch();

  const [showFriendPopup, setShowFriendPopup] = useState<boolean>(false);
  const [showNewRoomFormModal, setShowNewRoomFormModal] =
    useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLang, setCurrentLang] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");

  const [counter, setCounter] = useState(1);
  const [showFullLangs, setShowFullLangs] = useState(false);
  const [showFullTopics, setShowFullTopics] = useState(false);

  const isFirstMount = useRef(true);
  const readMoreRef = useRef<HTMLDivElement>(null);
  const prevFiltersRef = useRef({ prevLang: "", prevLevel: "", prevTopic: "" });

  const loadMoreRooms = () => {
    setCurrentPage(currentPage + 1);
  };

  useIntersectionObserver({
    targetRef: readMoreRef,
    onIntersecting: loadMoreRooms,
    requiredCondition: rooms.length > 0,
    deps: [rooms],
  });

  const toggleFriendsPopup = () => {
    setShowFriendPopup(!showFriendPopup);
  };

  // Determine page first mount
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
  }, []);

  // Subscribe to room update
  useEffect(() => {
    dispatch(fetchRoomsGroupedByLanguage());
    const roomSocket = subscribeRoomsUpdates(dispatch);
    return () => {
      roomSocket.disconnect();
    };
  }, [dispatch]);

  //Monitor Language, Level, Topic changes
  useEffect(() => {
    if (
      (currentLang !== prevFiltersRef.current.prevLang ||
        currentLevel !== prevFiltersRef.current.prevLevel ||
        currentTopic !== prevFiltersRef.current.prevTopic) &&
      currentPage > 1
    ) {
      setCurrentPage(1);
    } else {
      dispatch(
        fetchRooms({
          pagination: {
            pageNumber: currentPage,
            pageSize: ENVS.ROOMS_ITEMS,
          },
          filters: {
            language: currentLang,
            level: currentLevel,
            topic: currentTopic,
          },
          resultStrategy: currentPage === 1 ? "replace" : "append",
        })
      );
    }
    prevFiltersRef.current = {
      prevLang: currentLang,
      prevLevel: currentLevel,
      prevTopic: currentTopic,
    };
  }, [dispatch, currentPage, currentLang, currentLevel, currentTopic]);

  return (
    <main className="p-2 md:p-10 grid gap-y-6 bg-primary">
      <Head>
        <title>Practice English Online - HeyGuyz.com</title>
      </Head>

      {/* <button
        className="text-white"
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Change Counter
      </button> */}

      <HeaderControls
        onClickCreateRoom={() => {
          setShowNewRoomFormModal(true);
        }}
        onClickGenRoom={() => {
          addRooms(counter);
          setCounter(counter + 1);
        }}
        onClickShowRules={() => {
          setShowRules(true);
        }}
      />
      {/* <hr /> */}
      <div>
        {/* <div className="text-white">CurrentPage: {currentPage}</div> */}

        <div>
          <div className="text-white text-sm">Languages:</div>
          <div className="flex flex-wrap items-center">
            {/* {!showFullLangs && currentLang && (
              <PillItem
                title={currentLang}
                count={
                  roomsGroupedByLanguage.find((l) => l.language === currentLang)
                    ?.count
                }
                active={true}
                onEmitSelect={setCurrentLang}
              />
            )} */}
            {roomsGroupedByLanguage
              .filter((lang) => lang.count > 0)
              .map((lang) => (
                <PillItem
                  key={lang.language}
                  title={lang.language}
                  count={lang.count}
                  active={lang.language === currentLang}
                  onEmitSelect={setCurrentLang}
                />
              ))}
            <div
              className="flex items-center ml-2 cursor-pointer text-gray-500 hover:text-accent2"
              onClick={() => {
                setShowFullLangs(!showFullLangs);
              }}
            >
              {/* <span className="text-xs">
                {showFullLangs
                  ? "Collapse"
                  : `Show All ${roomsGroupedByLanguage.length - 6}+`}
              </span> */}
              {/* {showFullLangs ? (
                <ChevronUpIcon className=" h-5 w-5" />
              ) : (
                <ChevronDownIcon className=" h-5 w-5" />
              )} */}
            </div>
          </div>
        </div>

        <div className="my-2"></div>

        <div>
          <div className="text-white text-sm">Levels:</div>
          <div className="flex items-center flex-wrap">
            {LANGAUGE_LEVEL.map((level, index) => (
              <PillItem
                key={index}
                title={level}
                active={level === currentLevel}
                onEmitSelect={setCurrentLevel}
              />
            ))}
          </div>
        </div>

        <div className="my-2"></div>

        <div>
          <div className="text-white text-sm">Topics:</div>
          <div className="flex items-center flex-wrap">
            {/* {!showFullTopics && currentTopic && (
              <PillItem
                title={currentTopic}
                active={true}
                onEmitSelect={setCurrentTopic}
              />
            )} */}

            {TOPICS.map((topic, index) => (
              <PillItem
                key={index}
                title={topic}
                active={topic === currentTopic}
                onEmitSelect={setCurrentTopic}
              />
            ))}
            <div
              className="flex items-center ml-2 cursor-pointer text-gray-500 hover:text-accent2"
              onClick={() => {
                setShowFullTopics(!showFullTopics);
              }}
            >
              {/* <span className="text-xs">
                {showFullTopics ? "Collapse" : `Show Al ${TOPICS.length - 6}+`}
              </span> */}
              {/* {showFullTopics ? (
                <ChevronUpIcon className=" h-5 w-5" />
              ) : (
                <ChevronDownIcon className=" h-5 w-5" />
              )} */}
            </div>
          </div>
        </div>
      </div>
      {/* <hr /> */}
      <div className="text-white">
        {status} {rooms.length}
      </div>
      <RoomList
        rooms={rooms}
        isLoading={!isFirstMount.current && status === "loading"}
      ></RoomList>
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
      {canLoadMore && <div ref={readMoreRef}></div>}
      {/* {canLoadMore && (
        <div
          className="text-white mx-auto border border-gray-200 p-2 text-sm rounded-md cursor-pointer hover:text-accent2 delay-100 transition-all"
          ref={readMoreRef}
        >
          <div className="" onClick={() => setCurrentPage(currentPage + 1)}>
            Load More...
          </div>
        </div>
      )} */}
      {/* {status === "loading" && <DarkOverlay />} */}
    </main>
  );
};

export default HomePage;
