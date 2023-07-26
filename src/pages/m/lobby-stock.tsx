import PageContainer from "@/components/Layouts/PageContainer";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import LobbyChatListMobile from "@/components/Lobby/LobbyChatListMobile";
import { subscribeLobbyChatStockUpdates } from "@/libs/ws-subscriptions";
import {
  createLobbyChatStockAsync,
  fetchLobbyChatStockAsync,
} from "@/store/lobbyChatStockSlice";

const MobileLobbyStockPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    lobbyChatsStock,
    status: lobbyChatStatus,
    canLoadMore: canLoadLobbyChatMore,
    lastFetchedItemId,
    lastAddedItemId,
  } = useSelector((state: RootState) => state.lobbyChatStock);

  const loadMoreLobbyChatMessages = () => {
    dispatch(
      fetchLobbyChatStockAsync({
        psize: 10,
        cursor: lastFetchedItemId,
      })
    );
  };

  useEffect(() => {
    const lobbyChatStockSocket = subscribeLobbyChatStockUpdates(dispatch);
    return () => {
      lobbyChatStockSocket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    if (dispatch) {
      dispatch(
        fetchLobbyChatStockAsync({
          psize: 20,
          cursor: "",
        })
      );
    }
  }, [dispatch]);

  return (
    <PageContainer>
      <h2 className="text-2xl text-white fixed top-16 left-20 z-50">
        Lobby Chat Messagges (STOCK)
      </h2>
      <LobbyChatListMobile
        lobbyChats={lobbyChatsStock}
        isLoading={lobbyChatStatus === "loading"}
        onLoadMore={loadMoreLobbyChatMessages}
        canLoadMore={canLoadLobbyChatMore}
        onSendMessage={(message: string) => {
          dispatch(createLobbyChatStockAsync({ message, type: "message" }));
        }}
        lastAddedItemId={lastAddedItemId}
      />
    </PageContainer>
  );
};

export default MobileLobbyStockPage;
