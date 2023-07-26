// LobbyChat slice is collection of actions for chat rooms list in homepage
import { IAsyncState } from "@/types/frontend";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderBy } from "lodash";
import { RootState } from "./store";
import { ILobbyChat, IPaginationCursorBased } from "@/types/common";

interface LobbyChatStockState extends IAsyncState {
  lobbyChatsStock: ILobbyChat[];
  canLoadMore: boolean;
  lastFetchedItemId: string;
  lastAddedItemId: string;
}

const initialState: LobbyChatStockState = {
  lobbyChatsStock: [],
  canLoadMore: true,
  lastFetchedItemId: "",
  lastAddedItemId: "",
  status: "idle", //TODO: this status is buggy because all of async functions here that run simutinously migth overwrite each others status
  error: "",
};

export const fetchLobbyChatStockAsync = createAsyncThunk(
  "fetchLobbyChatStockAsync",
  async (
    pagination: IPaginationCursorBased
  ): Promise<{ pagination: IPaginationCursorBased; data: ILobbyChat[] }> => {
    const endpoint = `${ENVS.API_URL}/lobby-chat/stock?psize=${pagination.psize}&cursor=${pagination.cursor}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return { data, pagination };
  }
);

export const createLobbyChatStockAsync = createAsyncThunk(
  "createLobbyChatStockAsync",
  async (payload: Pick<ILobbyChat, "message" | "type">, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;

    const endpoint = `${ENVS.API_URL}/lobby-chat/stock`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${currentState.auth.user?.idToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const createdLobbyChat = await response.json();
    return createdLobbyChat as ILobbyChat;
  }
);

const lobbyChatStockSlice = createSlice({
  name: "lobbyChatStock",
  initialState,
  reducers: {
    addLobbyChatStockMessage(state, action: PayloadAction<ILobbyChat>) {
      state.lobbyChatsStock.push(action.payload);
      state.lastAddedItemId = action.payload._id;
    },
    resetLobbyChat(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLobbyChatStockAsync.pending, (state, action) => {
        state.status = "loading";
        state.canLoadMore = true;
      })
      .addCase(fetchLobbyChatStockAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.canLoadMore =
          action.payload.data.length === action.payload.pagination.psize;
        if (action.payload.data.length > 0) {
          state.lobbyChatsStock = [
            ...orderBy(action.payload.data, "createdAt"),
            ...state.lobbyChatsStock,
          ];

          if (action.payload.data.length > 0) {
            const lastItemIndex = action.payload.data.length - 1;
            state.lastFetchedItemId = action.payload.data[lastItemIndex]._id;
          }
        } else {
          state.canLoadMore = false;
        }
      })
      .addCase(fetchLobbyChatStockAsync.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message ?? "Failed to fetch lobby chat stock";
      });

    builder
      .addCase(createLobbyChatStockAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLobbyChatStockAsync.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(createLobbyChatStockAsync.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message ?? "Failed to create lobby chat stock";
      });
  },
});

export const { addLobbyChatStockMessage, resetLobbyChat } =
  lobbyChatStockSlice.actions;
export default lobbyChatStockSlice.reducer;
