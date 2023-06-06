import Friends from "@/components/Friends/FriendList";
import PillItem from "@/components/UIs/PillItem";
import RoomList from "@/components/Rooms/RoomList";
import { useEffect, useRef, useState } from "react";

import Modal from "@/components/UIs/Modal";
import NewRoomForm from "@/components/Rooms/NewRoomForm";
import HeaderControls from "@/components/UIs/HeaderControls";
import Rules from "@/components/Rules";
import { ENVS, LANGAUGE_LEVEL, TOPICS } from "@/utils/constants";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom,
  fetchRoomsAsync,
  fetchRoomsGroupedByLanguageAsync,
  updateFilters,
  updateRooms,
} from "@/store/roomSlice";
import { AppDispatch, RootState } from "@/store/store";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { subscribeRoomsUpdates } from "@/libs/ws-subscriptions";
import * as _ from "lodash";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { ArrowRightIcon, ArrowUturnUpIcon } from "@heroicons/react/24/outline";
import { FieldValues } from "react-hook-form";
import Notification from "@/components/UIs/Notification";
import PageContainer from "@/components/Layouts/PageContainer";

const HomePage = () => {
  // console.log("HomePage");
  const {
    rooms,
    roomsGroupedByLanguage,
    status,
    error,
    canLoadMore,
    recentCreatedRoomId,
  } = useSelector((state: RootState) => state.room);

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
  const [showRoomCreatedNotification, setShowRoomCreatedNotification] =
    useState(false);

  const isFirstMount = useRef(true);
  const readMoreRef = useRef<HTMLDivElement>(null);
  const firstRoomRef = useRef<HTMLDivElement>(null);
  const prevFiltersRef = useRef({ prevLang: "", prevLevel: "", prevTopic: "" });

  const loadMoreRooms = () => {
    setCurrentPage(currentPage + 1);
  };

  useIntersectionObserver({
    targetRef: readMoreRef,
    onIntersecting: loadMoreRooms,
    requiredCondition: rooms.length > 0 && canLoadMore && status === "success",
    deps: [rooms, canLoadMore, status],
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

  // Scroll to first room item when filters applied
  useEffect(() => {
    dispatch(
      updateFilters({
        language: currentLang,
        level: currentLevel,
        topic: currentTopic,
      })
    );
    focusOnFirstItem();
  }, [currentLang, currentLevel, currentTopic]);

  const focusOnFirstItem = () => {
    firstRoomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Subscribe to room update
  useEffect(() => {
    dispatch(fetchRoomsGroupedByLanguageAsync());
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
        fetchRoomsAsync({
          pagination: {
            pnum: currentPage,
            psize: ENVS.ROOMS_ITEMS,
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

  const onFormSubmit = (data: FieldValues) => {
    dispatch(createRoom(data))
      .unwrap()
      .then((createdRoom) => {
        setShowNewRoomFormModal(false);
        setShowRoomCreatedNotification(true);
        dispatch(updateRooms([{ ...createdRoom, updateStatus: "C" }]));
      })
      .catch(() => {
        setShowNewRoomFormModal(false);
      });
  };

  return (
    <PageContainer>
      <Head>
        <title>Yallyo2 - Language Learning Community</title>
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

      <div className="text-white" ref={firstRoomRef}>
        {status} {rooms.length}
      </div>

      <RoomList
        rooms={rooms}
        isLoading={status === "loading"}
        showOnTop={
          (!!currentLang || !!currentLevel || !!currentTopic) &&
          currentPage === 1
        }
      ></RoomList>
      {showFriendPopup && (
        <Friends onEmitClose={() => setShowFriendPopup(false)} />
      )}

      {/* Toggle Friends */}
      {/* <div
        className="fixed bottom-0 right-2 md:right-10 bg-secondary px-4 py-1 rounded-t-lg  text-accent1 hover:text-accent2 border border-b-0 cursor-pointer select-none"
        onClick={toggleFriendsPopup}
      >
        <div className="flex gap-x-2 justify-center items-center">
          <UserIcon className="h-5 w-5" />
          <span className="text-md">My Friends</span>
        </div>
      </div> */}

      {/* Go to top */}
      {currentPage > 1 && (
        <div
          className="fixed bottom-0 right-2 md:right-10 bg-secondary px-4 py-1 rounded-t-lg  border border-b-0 cursor-pointer select-none text-white hover:text-accent2 hover:border-accent2"
          onClick={focusOnFirstItem}
        >
          <div className="flex gap-x-2 justify-center items-center">
            <ArrowUturnUpIcon className="h-5 w-5" />
            <span className="text-md">To Top</span>
          </div>
        </div>
      )}

      {showNewRoomFormModal && (
        <Modal
          showCloseButton={true}
          emitClose={() => {
            setShowNewRoomFormModal(false);
          }}
        >
          <NewRoomForm onSubmit={onFormSubmit} />
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
      {canLoadMore && <div className="mt-52" ref={readMoreRef}></div>}
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

      {showRoomCreatedNotification && (
        <Notification
          type="success"
          messageTitle="Room created successfully!"
          messageBody={
            <div className="flex items-center">
              <span>Your room is now ready.</span>

              <div className="flex items-center border rounded-md py-1 px-2 bg-white text-accent1 hover:text-accent2 hover:bg-secondary ml-2 cursor-pointer">
                <ArrowRightIcon className="h-4 w-4 mr-2" />
                <a
                  href={`/room/${recentCreatedRoomId}`}
                  target="_blank"
                  onClick={() => {
                    setShowRoomCreatedNotification(false);
                  }}
                >
                  Join Now
                </a>
              </div>
            </div>
          }
          autoFadeout={false}
          onFadedOut={() => {
            setShowRoomCreatedNotification(false);
          }}
        />
      )}

      {/* Generic errors for any situations related to room CRUD asyncs */}
      {status === "error" && (
        <Notification
          type="error"
          messageTitle="Something went wrong!"
          messageBody={error || "You can refresh the page or try again later."}
          autoFadeout={true}
          onFadedOut={() => {}}
        />
      )}
    </PageContainer>
  );
};

export default HomePage;
