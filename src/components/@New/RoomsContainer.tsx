import {
  setCurrentActiveRoomId,
  toggleRoomContainer,
} from "@/store/layoutSlice";
import { AppDispatch, RootState } from "@/store/store";
import { createNArray } from "@/utils/array-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

const RoomsContainer = () => {
  const { roomsContainerExpanded, currentActiveRoomId } = useSelector(
    (state: RootState) => state.layout
  );

  const dispatch: AppDispatch = useDispatch();

  return (
    <div
      className={`${roomsContainerExpanded ? "w-3/12" : "w-[50px]"} ${
        !currentActiveRoomId && "flex-1"
      } bg-blue-500  overflow-scroll`}
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

      {createNArray(100).map((value, index) => (
        <div
          key={index}
          className=""
          onClick={() => {
            dispatch(setCurrentActiveRoomId("someid"));
          }}
        >
          Room {index}
        </div>
      ))}
    </div>
  );
};

export default RoomsContainer;
