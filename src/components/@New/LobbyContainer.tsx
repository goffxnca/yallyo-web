import { toggleLobbyContainer } from "@/store/layoutSlice";
import { AppDispatch, RootState } from "@/store/store";
import { createNArray } from "@/utils/array-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

const LobbyContainer = () => {
  const { lobbyContainerExpanded } = useSelector(
    (state: RootState) => state.layout
  );

  const dispatch: AppDispatch = useDispatch();

  return (
    <div
      className={`${
        lobbyContainerExpanded ? "w-3/12" : "w-[50px]"
      } bg-green-200  overflow-scroll`}
    >
      {lobbyContainerExpanded ? (
        <button
          onClick={() => {
            dispatch(toggleLobbyContainer());
          }}
          className=""
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch(toggleLobbyContainer());
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
  );
};

export default LobbyContainer;
