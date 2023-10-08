import PageContainer from "@/components/Layouts/PageContainer";
import {
  createLobbyChatAsync,
  fetchLobbyChatAsync,
} from "@/store/lobbyChatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import LobbyChatList from "@/components/Lobby/LobbyChatList";
import { subscribeLobbyChatUpdates } from "@/libs/ws-subscriptions";

const LobbyPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    lobbyChats,
    status: lobbyChatStatus,
    canLoadMore: canLoadLobbyChatMore,
    lastFetchedItemId,
    lastAddedItemId,
  } = useSelector((state: RootState) => state.lobbyChat);

  const loadMoreLobbyChatMessages = () => {
    dispatch(
      fetchLobbyChatAsync({
        psize: 5,
        cursor: lastFetchedItemId,
      })
      );
  };

  // Subscribe to room update
  useEffect(() => {
    const lobbyChatSocket = subscribeLobbyChatUpdates(dispatch);
    return () => {
      lobbyChatSocket.disconnect();
    };
    }, [dispatch]);

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
    <PageContainer>
      <LobbyChatList
        lobbyChats={lobbyChats}
        isLoading={lobbyChatStatus === "loading"}
        onLoadMore={loadMoreLobbyChatMessages}
        canLoadMore={canLoadLobbyChatMore}
        onSendMessage={(message: string) => {
        dispatch(createLobbyChatAsync({ message, type: "message" }));
      }}
        lastAddedItemId={lastAddedItemId}
      />
    </PageContainer>
    );
};

export default LobbyContainer;
