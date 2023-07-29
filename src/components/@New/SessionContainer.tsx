import { setCurrentActiveRoomId } from "@/store/layoutSlice";
import { AppDispatch, RootState } from "@/store/store";
import { createNArray } from "@/utils/array-utils";

import { useDispatch, useSelector } from "react-redux";

const SessionContainer = () => {
  const { currentActiveRoomId } = useSelector(
    (state: RootState) => state.layout
  );

  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      {currentActiveRoomId && (
        <div className={`flex-1 bg-secondary overflow-scroll`}>
          <button
            onClick={() => {
              dispatch(setCurrentActiveRoomId(""));
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
    </>
  );
};

export default SessionContainer;
