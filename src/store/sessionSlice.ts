import { IPagination, IRoom } from "@/types/common";
import { IAsyncState, SessionConrol } from "@/types/frontend";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { RootState } from "./store";

interface SessionState extends IAsyncState {
  room?: IRoom;
  controls: SessionConrol;
}

const initialState: SessionState = {
  status: "idle",
  error: "",
  controls: {
    micOn: false,
    camOn: false,
    shareScreenOn: false,
    chatOn: false,
  },
};

export const fetchSession = createAsyncThunk(
  "room/fetchRoom",
  async (roomId: string, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;

    const endpoint = `${ENVS.API_URL}/rooms/${roomId}`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        authorization: `Bearer ${currentState.auth.user?.idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as IRoom;
  }
);

export const joinRoom = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: IPagination) => {}
);

export const leaveRoom = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: IPagination) => {}
);

export const cancelRoom = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: IPagination) => {}
);

export const sendRoomMessage = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: IPagination) => {}
);

export const reportRoom = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: IPagination) => {}
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession(state, action: PayloadAction<IRoom>) {
      //   state.room
    },
    toggleMic(state) {
      state.controls.micOn = !state.controls.micOn;
    },
    toggleCam(state) {
      state.controls.camOn = !state.controls.camOn;
    },
    toggleShareScreen(state) {
      state.controls.shareScreenOn = !state.controls.shareScreenOn;
    },
    toggleChat(state) {
      state.controls.chatOn = !state.controls.chatOn;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSession.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.status = "success";
        state.room = action.payload;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch session";
      });
  },
});

export const {
  addSession,
  toggleMic,
  toggleCam,
  toggleShareScreen,
  toggleChat,
} = sessionSlice.actions;
export default sessionSlice.reducer;
