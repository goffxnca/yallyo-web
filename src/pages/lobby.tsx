import PageContainer from "@/components/Layouts/PageContainer";
import Lobby from "@/components/Lobby/Lobby";
import {
  createLobbyChatAsync,
  fetchLobbyChatAsync,
} from "@/store/lobbyChatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import LobbyChatListMobile from "@/components/Lobby/LobbyChatListMobile";
import { subscribeLobbyChatUpdates } from "@/libs/ws-subscriptions";

const LobbyPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    lobbyChats,
    status: lobbyChatStatus,
    canLoadMore: canLoadLobbyChatMore,
  } = useSelector((state: RootState) => state.lobbyChat);

  // Subscribe to room update
  useEffect(() => {
    const lobbyChatSocket = subscribeLobbyChatUpdates(dispatch);
    return () => {
      lobbyChatSocket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    // alert("fetching lobby slice");
    dispatch(
      fetchLobbyChatAsync({
        pnum: 1,
        psize: 30,
      })
    );
  }, [dispatch]);

  return (
    <PageContainer>
      <LobbyChatListMobile
        lobbyChats={lobbyChats}
        isLoading={lobbyChatStatus === "loading"}
        onLoadMore={() => {}}
        canLoadMore={canLoadLobbyChatMore}
        onSendMessage={(message: string) => {
          dispatch(createLobbyChatAsync({ message, type: "message" }));
        }}
      />
    </PageContainer>
  );
};

export default LobbyPage;
