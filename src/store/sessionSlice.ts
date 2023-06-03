import { IPagination, IRoom, IRoomPeer } from "@/types/common";
import { IAsyncState, SessionConrol } from "@/types/frontend";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { RootState } from "./store";

interface SessionState extends IAsyncState {
  room?: IRoom;
  peers: IRoomPeer[];
  controls: SessionConrol;
}

const initialState: SessionState = {
  status: "idle",
  error: "",
  peers: [],
  controls: {
    micOn: true,
    camOn: true,
    shareScreenOn: false,
    chatOn: false,
  },
};

export const fetchSessionAsync = createAsyncThunk(
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

export const fetchPeersAsync = createAsyncThunk(
  "room/fetchPeers",
  async (roomId: string, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;

    const endpoint = `${ENVS.API_URL}/rooms/${roomId}/peers`;
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
    return data as IRoomPeer[];
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
    toggleLocalMic(state) {
      state.controls.micOn = !state.controls.micOn;
    },
    toggleLocalCam(state) {
      state.controls.camOn = !state.controls.camOn;
    },
    toggleShareScreen(state) {
      state.controls.shareScreenOn = !state.controls.shareScreenOn;
    },
    toggleChat(state) {
      state.controls.chatOn = !state.controls.chatOn;
    },
    toggleMic(state, action: PayloadAction<string>) {
      state.peers = state.peers.map((peer) =>
        peer.socketId === action.payload
          ? {
              ...peer,
              controls: {
                ...peer.controls,
                micOn: !peer.controls.micOn,
              },
            }
          : peer
      );
    },
    toggleCam(state, action: PayloadAction<string>) {
      state.peers = state.peers.map((peer) =>
        peer.socketId === action.payload
          ? {
              ...peer,
              controls: {
                ...peer.controls,
                camOn: !peer.controls.camOn,
              },
            }
          : peer
      );
    },
    addPeer(state, action: PayloadAction<IRoomPeer>) {
      state.peers = [...state.peers, { ...action.payload, status: "joining" }];
    },
    markPeerAsRemoving(state, action: PayloadAction<string>) {
      state.peers = state.peers.map((peer) =>
        peer.socketId === action.payload ? { ...peer, status: "leaving" } : peer
      );
    },
    removePeer(state, action: PayloadAction<string>) {
      state.peers = state.peers.filter(
        (peer) => peer.socketId !== action.payload
      );
    },
    removePeerLoading(state, action: PayloadAction<string>) {
      state.peers = state.peers.map((peer) =>
        peer.userId === action.payload ? { ...peer, status: "connected" } : peer
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSessionAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSessionAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.room = action.payload;
      })
      .addCase(fetchSessionAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch session";
      });

    builder
      .addCase(fetchPeersAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPeersAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.peers = action.payload;
      })
      .addCase(fetchPeersAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch room's peers";
      });
  },
});

export const {
  toggleLocalMic,
  toggleLocalCam,
  addSession,
  toggleMic,
  toggleCam,
  toggleShareScreen,
  toggleChat,
  addPeer,
  removePeer,
  removePeerLoading,
  markPeerAsRemoving,
} = sessionSlice.actions;
export default sessionSlice.reducer;
