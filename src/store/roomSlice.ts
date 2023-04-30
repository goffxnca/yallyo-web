import {
  AsyncState,
  Pagination,
  Room,
  RoomFetchOptions,
  RoomsGroupedByLanguage,
} from "@/models/types";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";

interface RoomState extends AsyncState {
  rooms: Room[];
  roomsGroupedByLanguage: RoomsGroupedByLanguage[];
  canLoadMore: boolean;
}

const initialState: RoomState = {
  rooms: [],
  roomsGroupedByLanguage: [],
  status: "idle",
  error: "",
  canLoadMore: true,
};

export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (options: RoomFetchOptions) => {
    const endpoint = `${ENVS.API_URL}/rooms?pageNumber=${options.pagination.pageNumber}&pageSize=${options.pagination.pageSize}&language=${options.filters?.language}&level=${options.filters?.level}&topic=${options.filters?.topic}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data as Room[];
  }
);

export const fetchRoomsGroupedByLanguage = createAsyncThunk(
  "room/groupedByLanguage",
  async () => {
    const endpoint = `${ENVS.API_URL}/rooms/groupedByLanguage`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data as RoomsGroupedByLanguage[];
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

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    receiveRoomsChanges(state, action: PayloadAction<any[]>) {
      const roomChanges = action.payload;

      //   roomChanges.forEach(() => {
      //     if (1) {
      //       addRoom(state, null);
      //     } else if (2) {
      //       removeRoom(state, null);
      //     } else if (3) {
      //       updateRoom(state, null);
      //     }
      //   });
    },
    addRoom(state, action: PayloadAction<Room>) {
      state.rooms.push(action.payload);
    },
    updateRoom(state, action: PayloadAction<Room>) {
      const index = state.rooms.findIndex(
        (room) => room._id === action.payload._id
      );
      state.rooms[index] = action.payload;
    },
    removeRoom(state, action: PayloadAction<string>) {
      state.rooms = state.rooms.filter((room) => room._id !== action.payload);
    },
    resetRoom(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRooms.pending, (state, action) => {
        state.status = "loading";
        state.canLoadMore = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.length > 0) {
          state.rooms =
            action.meta.arg.resultStrategy === "append"
              ? [...state.rooms, ...action.payload]
              : action.payload;
        } else {
          state.canLoadMore = false;
          if (action.meta.arg.pagination.pageNumber === 1) {
            state.rooms = [];
          }
        }
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch rooms";
      });

    builder
      .addCase(fetchRoomsGroupedByLanguage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoomsGroupedByLanguage.fulfilled, (state, action) => {
        state.status = "success";
        state.roomsGroupedByLanguage = _.orderBy(
          action.payload,
          ["count", "language"],
          ["desc", "asc"]
        );
      })
      .addCase(fetchRoomsGroupedByLanguage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch rooms";
      });
  },
});

export const { addRoom, updateRoom, removeRoom, resetRoom } = roomSlice.actions;
export default roomSlice.reducer;
