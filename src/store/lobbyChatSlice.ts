// Room slice is collection of actions for chat rooms list in homepage
import { IAsyncState } from "@/types/frontend";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderBy } from "lodash";
import { RootState } from "./store";
import { ILobbyChat, IPagination } from "@/types/common";

interface LobbyChatState extends IAsyncState {
  lobbyChats: ILobbyChat[];
  canLoadMore: boolean;
}

const initialState: LobbyChatState = {
  lobbyChats: [],
  canLoadMore: true,
  status: "idle", //TODO: this status is buggy because all of async functions here that run simutinously migth overwrite each others status
  error: "",
};

export const fetchLobbyChatAsync = createAsyncThunk(
  "fetchLobbyChatAsync",
  async (pagination: IPagination) => {
    const endpoint = `${ENVS.API_URL}/lobby-chat?pnum=${pagination.pnum}&psize=${pagination.psize}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as ILobbyChat[];
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
        state.canLoadMore = action.payload.length === ENVS.ROOMS_ITEMS;
        if (action.payload.length > 0) {
          state.lobbyChats = [
            ...orderBy(action.payload, "message"),
            ...state.lobbyChats,
          ];
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
        state.error = action.error.message ?? "Failed to create room";
      });
  },
});

export const { addLobbyChatMessage, resetLobbyChat } = lobbyChatSlice.actions;
export default lobbyChatSlice.reducer;
