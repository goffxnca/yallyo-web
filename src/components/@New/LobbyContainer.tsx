import { toggleLobbyContainer } from "@/store/layoutSlice";
import { fetchLobbyChatAsync } from "@/store/lobbyChatSlice";
import { AppDispatch, RootState } from "@/store/store";
import { createNArray } from "@/utils/array-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LobbyChatList from "../Lobby/LobbyChatList";
import { useMediaQuery } from "usehooks-ts";

const LobbyContainer = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { lobbyContainerExpanded } = useSelector(
    (state: RootState) => state.layout
  );

  const {
    lobbyChats,
    status: lobbyChatStatus,
    canLoadMore: canLoadLobbyChatMore,
    lastFetchedItemId,
  } = useSelector((state: RootState) => state.lobbyChat);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isDesktop) {
      dispatch(toggleLobbyContainer());
    }
  }, [isDesktop, dispatch]);

  useEffect(() => {
    if (dispatch) {
      dispatch(
        fetchLobbyChatAsync({
          psize: 20,
          cursor: "",
        })
      );
    }
  }, [dispatch]);

  return (
    <div
      className={`absolute md:relative left-0 z-30 ${
        lobbyContainerExpanded ? "w-11/12 md:w-3/12" : "w-0 md:w-[50px]"
      } overflow-scroll bg-green-200`}
    >
      <div className="text-right">
        {lobbyContainerExpanded ? (
          <button
            onClick={() => {
              dispatch(toggleLobbyContainer());
            }}
            className=""
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(toggleLobbyContainer());
            }}
            className=""
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* {createNArray(100).map((value, index) => (
        <div key={index} className="">
          Lobby Message {index}
        </div>
      ))} */}

      <LobbyChatList
        lobbyChats={lobbyChats}
        isLoading={lobbyChatStatus === "loading"}
        onLoadMore={() => {}}
        canLoadMore={canLoadLobbyChatMore}
        onSendMessage={(message: string) => {
          // dispatch(createLobbyChatAsync({ message, type: "message" }));
        }}
        onToggleLobby={() => {
          // setShowLobby(!showLobby);
        }}
        showFullLobby={false}
      />
    </div>
  );
};

export default LobbyContainer;
