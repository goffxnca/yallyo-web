import { IMediaControls, IPagination, IRoom, IRoomPeer } from "@/types/common";
import { IAsyncState, LocalControls } from "@/types/frontend";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { RootState } from "./store";

interface SessionState extends IAsyncState {
  room?: IRoom;
  peers: IRoomPeer[];
  localControls: LocalControls;
}

const initialState: SessionState = {
  status: "idle",
  error: "",
  peers: [],
  localControls: {
    chatOn: false,
  },
};

export const fetchSessionAsync = createAsyncThunk(
  "room/fetchSessionAsync",
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

export const fetchSessionBySidAsync = createAsyncThunk(
  "room/fetchSessionBySidAsync",
  async (roomSid: string, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;

    const endpoint = `${ENVS.API_URL}/rooms/bysid/${roomSid}`;
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
  "room/fetchPeersAsync",
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

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    toggleLocalChat(state) {
      state.localControls.chatOn = !state.localControls.chatOn;
    },
    toggleMic(state, action: PayloadAction<any>) {
      const { socketId, status } = action.payload;
      updateMediaControls(state, socketId, { micOn: status });
    },
    toggleCam(state, action: PayloadAction<any>) {
      const { socketId, status } = action.payload;
      updateMediaControls(state, socketId, { camOn: status });
    },
    addPeer(state, action: PayloadAction<IRoomPeer>) {
      // state.peers = [...state.peers, { ...action.payload, status: "joining" }];
      const existingPeer = state.peers.find(
        (peer) => peer.userId === action.payload.userId
      );
      if (existingPeer) {
        // There are somes weird case as well where peer2 try to keep refresh page intensionally (malicious user) resulting in removePeer() does not works
        // So we just replace the old user peer info with same user but newer socket id connection.
        // How to reproduce: Connect 2 peers, then the other peer press refresh and during peer1 calling, then peer2 interupt by refresh again, now peerjs will thown error,
        // and somehow resulting in calling removePeer() does not remove the peer2 user before same new peer 2 user join again from refresh effect
        // In summary, if the call interupt and not success usually interupt by quit or refresh before connection success, coz removePeer() to not working
        console.error(
          `edgecase: addPeer() by replacing the old user with same user but newest socket`
        );
        console.error(`Made by user ${action.payload.userId}`);
        state.peers = state.peers.map((peer) =>
          peer.userId === action.payload.userId
            ? { ...action.payload, status: "joining" }
            : peer
        );
      } else {
        state.peers = [
          ...state.peers,
          { ...action.payload, status: "joining" },
        ];
      }
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
        state.error =
          action.error.message ?? "Failed to fetch session by room id";
      });

    builder
      .addCase(fetchSessionBySidAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSessionBySidAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.room = action.payload;
      })
      .addCase(fetchSessionBySidAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch session by sid";
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

const updateMediaControls = (
  state: SessionState,
  socketId: string,
  updateData: Partial<IMediaControls>
) => {
  state.peers = state.peers.map((peer) =>
    peer.socketId === socketId
      ? {
          ...peer,
          controls: { ...peer.controls, ...updateData },
        }
      : peer
  );
};

export const {
  toggleLocalChat,
  toggleMic,
  toggleCam,
  addPeer,
  removePeer,
  removePeerLoading,
  markPeerAsRemoving,
} = sessionSlice.actions;
export default sessionSlice.reducer;
