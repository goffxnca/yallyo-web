import {
  setCurrentActiveRoomId,
  toggleSessionContainer,
} from "@/store/layoutSlice";
import { AppDispatch, RootState } from "@/store/store";
import { createNArray } from "@/utils/array-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "usehooks-ts";

const SessionContainer = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { currentActiveRoomId, sessionContainerExpanded } = useSelector(
    (state: RootState) => state.layout
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isDesktop) {
      dispatch(toggleSessionContainer());
    }
  }, [isDesktop, dispatch]);

  return (
    <div
      className={`absolute md:relative right-0 z-40 ${
        sessionContainerExpanded ? "w-11/12 md:w-3/12" : "w-0 md:w-[50px]"
      } overflow-scroll bg-red-200`}
    >
      <div className="text-left">
        {sessionContainerExpanded ? (
          <button
            onClick={() => {
              dispatch(toggleSessionContainer());
            }}
            className=""
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(toggleSessionContainer());
            }}
            className=""
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {createNArray(100).map((value, index) => (
        <div key={index} className="">
          Room Member {index}
        </div>
      ))}
    </div>
  );
};

export default SessionContainer;
