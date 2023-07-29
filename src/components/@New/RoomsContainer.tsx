import {
  setCurrentActiveRoomId,
  toggleRoomContainer,
} from "@/store/layoutSlice";
import { AppDispatch, RootState } from "@/store/store";
import { createNArray } from "@/utils/array-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import RoomList from "../Rooms/RoomList";
import { useEffect } from "react";
import { fetchRoomsAsync } from "@/store/roomSlice";
import { ENVS } from "@/utils/constants";

const RoomsContainer = () => {
  const { roomsContainerExpanded, currentActiveRoomId } = useSelector(
    (state: RootState) => state.layout
  );

  const {
    rooms,
    roomsGroupedByLanguage,
    status,
    error,
    canLoadMore: canLoadRoomMore,
    recentCreatedRoomSid,
  } = useSelector((state: RootState) => state.room);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchRoomsAsync({
        pagination: {
          pnum: 1,
          psize: ENVS.ROOMS_ITEMS,
        },
        filters: {
          language: "",
          level: "",
          topic: "",
        },
        resultStrategy: "append",
      })
    );
  }, [dispatch]);

  return (
    <div
      className={`${roomsContainerExpanded ? "w-3/12" : "w-[50px]"} ${
        !currentActiveRoomId && "flex-1"
      }  overflow-scroll`}
    >
      <div className="text-right">
        {roomsContainerExpanded ? (
          <button
            onClick={() => {
              dispatch(toggleRoomContainer());
            }}
            className=""
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(toggleRoomContainer());
            }}
            className=""
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* {createNArray(100).map((value, index) => (
        <div
          key={index}
          className=""
          onClick={() => {
            dispatch(setCurrentActiveRoomId("someid"));
          }}
        >
          Room {index}
        </div>
      ))} */}

      <RoomList
        rooms={rooms}
        isLoading={false}
        showOnTop={false}
        showFullLobby={false}
      ></RoomList>
    </div>
  );
};

export default RoomsContainer;
