import PageContainer from "@/components/Layouts/PageContainer";
import {
  createLobbyChatAsync,
  fetchLobbyChatAsync,
} from "@/store/lobbyChatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import LobbyChatListMobile from "@/components/Lobby/LobbyChatListMobile";
import { subscribeLobbyChatUpdates } from "@/libs/ws-subscriptions";

const MobileLobbyPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    lobbyChats,
    status: lobbyChatStatus,
    canLoadMore: canLoadLobbyChatMore,
    lastFetchedItemId,
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
      <LobbyChatListMobile
        lobbyChats={lobbyChats}
        isLoading={lobbyChatStatus === "loading"}
        onLoadMore={loadMoreLobbyChatMessages}
        canLoadMore={canLoadLobbyChatMore}
        onSendMessage={(message: string) => {
          dispatch(createLobbyChatAsync({ message, type: "message" }));
        }}
      />
    </PageContainer>
  );
};

export default MobileLobbyPage;
