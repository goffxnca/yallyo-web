import { createNArray } from "@/utils/array-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const PerfectPage = () => {
  const [showRoomsContainerFull, setShowRoomsContainerFull] = useState(true);
  const [showLobbyContainerFull, setShowLobbyContainerFull] = useState(true);

  const [currentRoomId, setCurrentRoomId] = useState("");

  return (
    <div className="text-white fixed top-0 left-0 w-full bg-blue-500 ">
      <div className="bg-red-200 h-12">
        <div>Header</div>
      </div>
      <div className="flex h-screen">
        <div
          className={`${showRoomsContainerFull ? "w-3/12" : "w-[50px]"} ${
            !currentRoomId && "flex-1"
          } bg-blue-500  overflow-scroll`}
        >
          <div className="text-right">
            {showRoomsContainerFull ? (
              <button
                onClick={() => {
                  setShowRoomsContainerFull(false);
                }}
                className=""
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowRoomsContainerFull(true);
                }}
                className=""
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          {createNArray(100).map((value, index) => (
            <div
              key={index}
              className=""
              onClick={() => {
                setCurrentRoomId("haha");
              }}
            >
              Room {index}
            </div>
          ))}
        </div>

        {currentRoomId && (
          <div className={`flex-1 bg-secondary overflow-scroll`}>
            <button
              onClick={() => {
                setCurrentRoomId("");
              }}
              className=""
            >
              Hang Up
            </button>

            {createNArray(100).map((value, index) => (
              <div key={index} className="">
                Room Member {index}
              </div>
            ))}
          </div>
        )}

        <div
          className={`${
            showLobbyContainerFull ? "w-3/12" : "w-[50px]"
          } bg-green-200  overflow-scroll`}
        >
          {showLobbyContainerFull ? (
            <button
              onClick={() => {
                setShowLobbyContainerFull(false);
              }}
              className=""
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setShowLobbyContainerFull(true);
              }}
              className=""
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          )}

          {createNArray(100).map((value, index) => (
            <div key={index} className="">
              Lobby Message {index}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PerfectPage.noLayout = true;
export default PerfectPage;
