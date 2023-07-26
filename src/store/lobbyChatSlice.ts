// LobbyChat slice is collection of actions for chat rooms list in homepage
import { IAsyncState } from "@/types/frontend";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderBy } from "lodash";
import { RootState } from "./store";
import { ILobbyChat, IPaginationCursorBased } from "@/types/common";

interface LobbyChatState extends IAsyncState {
  lobbyChats: ILobbyChat[];
  canLoadMore: boolean;
  lastFetchedItemId: string;
  lastAddedItemId: string;
}

const initialState: LobbyChatState = {
  lobbyChats: [],
  canLoadMore: true,
  lastFetchedItemId: "",
  lastAddedItemId: "",
  status: "idle", //TODO: this status is buggy because all of async functions here that run simutinously migth overwrite each others status
  error: "",
};

export const fetchLobbyChatAsync = createAsyncThunk(
  "fetchLobbyChatAsync",
  async (
    pagination: IPaginationCursorBased
  ): Promise<{ pagination: IPaginationCursorBased; data: ILobbyChat[] }> => {
    const endpoint = `${ENVS.API_URL}/lobby-chat?psize=${pagination.psize}&cursor=${pagination.cursor}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return { data, pagination };
  }
);

export const createLobbyChatAsync = createAsyncThunk(
  "createLobbyChatAsync",
  async (payload: Pick<ILobbyChat, "message" | "type">, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;

    const endpoint = `${ENVS.API_URL}/lobby-chat`;
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

const lobbyChatSlice = createSlice({
  name: "lobbyChat",
  initialState,
  reducers: {
    addLobbyChatMessage(state, action: PayloadAction<ILobbyChat>) {
      state.lobbyChats.push(action.payload);
      state.lastAddedItemId = action.payload._id;
    },
    resetLobbyChat(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLobbyChatAsync.pending, (state, action) => {
        state.status = "loading";
        state.canLoadMore = true;
      })
      .addCase(fetchLobbyChatAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.canLoadMore =
          action.payload.data.length === action.payload.pagination.psize;
        if (action.payload.data.length > 0) {
          //If cursor provided that means its trigger from "Previous Messages" button
          if (action.payload.pagination.cursor) {
            state.lobbyChats = [
              ...orderBy(action.payload.data, "createdAt"),
              ...state.lobbyChats,
            ];
          } else {
            state.lobbyChats = [...orderBy(action.payload.data, "createdAt")];
          }

          if (action.payload.data.length > 0) {
            const lastItemIndex = action.payload.data.length - 1;
            state.lastFetchedItemId = action.payload.data[lastItemIndex]._id;
          }
        } else {
          state.canLoadMore = false;
        }
      })
      .addCase(fetchLobbyChatAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch lobby chat";
      });

    builder
      .addCase(createLobbyChatAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLobbyChatAsync.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(createLobbyChatAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to create lobby chat";
      });
  },
});

export const { addLobbyChatMessage, resetLobbyChat } = lobbyChatSlice.actions;
export default lobbyChatSlice.reducer;
