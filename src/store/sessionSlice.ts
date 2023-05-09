import { AsyncState, Pagination, Room, SessionConrol } from "@/models/types";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";

interface SessionState extends AsyncState {
  room?: Room;
  controls: SessionConrol;
}

const initialState: SessionState = {
  status: "idle",
  error: "",
  controls: {
    micOn: false,
    camOn: false,
    chatOn: false,
  },
};

export const fetchSession = createAsyncThunk(
  "room/fetchRoom",
  async (roomId: string) => {
    const endpoint = `${ENVS.API_URL}/rooms/${roomId}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Room;
  }
);

export const joinRoom = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: Pagination) => {}
);

export const leaveRoom = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: Pagination) => {}
);

export const cancelRoom = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: Pagination) => {}
);

export const sendRoomMessage = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: Pagination) => {}
);

export const reportRoom = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: Pagination) => {}
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession(state, action: PayloadAction<Room>) {
      //   state.room
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

export const { addSession, toggleChat } = sessionSlice.actions;
export default sessionSlice.reducer;
