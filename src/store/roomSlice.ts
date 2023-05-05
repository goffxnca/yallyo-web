import {
  AsyncState,
  Pagination,
  Room,
  RoomFetchOptions,
  RoomSocketUpdate,
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
  status: "idle", //TODO: this status is buggy because all of async functions here that run simutinously migth overwrite each others status
  error: "",
  canLoadMore: true,
};

export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (options: RoomFetchOptions) => {
    const endpoint = `${ENVS.API_URL}/rooms?pageNumber=${options.pagination.pageNumber}&pageSize=${options.pagination.pageSize}&language=${options.filters?.language}&level=${options.filters?.level}&topic=${options.filters?.topic}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Room[];
  }
);

export const fetchRoomsGroupedByLanguage = createAsyncThunk(
  "room/fetchRoomsGroupedByLanguage",
  async () => {
    const endpoint = `${ENVS.API_URL}/rooms/groupedByLanguage`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

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
    updateRooms(state, action: PayloadAction<RoomSocketUpdate[]>) {
      action.payload.forEach((roomUpdate) => {
        //Create
        if (roomUpdate.updateStatus === "C") {
          const existingRoom = state.rooms.find(
            (r) => r._id === roomUpdate._id
          );
          if (existingRoom) {
            return;
          }

          state.rooms = [roomUpdate, ...state.rooms];

          //If the group for specific language already exist in context, add +1 to it
          state.roomsGroupedByLanguage = state.roomsGroupedByLanguage.map(
            (group) =>
              group.language === roomUpdate.language
                ? { ...group, count: group.count + 1 }
                : group
          );

          //If not exist, manually assign 1
          if (
            state.roomsGroupedByLanguage.findIndex(
              (group) => group.language === roomUpdate.language
            ) === -1
          ) {
            state.roomsGroupedByLanguage = [
              ...state.roomsGroupedByLanguage,
              { language: roomUpdate.language, count: 1 },
            ];
          }
        }
        //Update
        else if (roomUpdate.updateStatus === "U") {
          state.rooms = state.rooms.map((room) =>
            room._id === roomUpdate._id ? roomUpdate : room
          );
        }
        //Delete
        else if (roomUpdate.updateStatus === "D") {
          const existingRoom = state.rooms.find(
            (r) => r._id === roomUpdate._id
          );
          if (existingRoom) {
            return;
          }

          state.rooms = state.rooms.filter(
            (room) => room._id !== roomUpdate._id
          );

          //If the group for specific language already exist in context, substract 1 from it
          state.roomsGroupedByLanguage = state.roomsGroupedByLanguage.map(
            (group) =>
              group.language === roomUpdate.language
                ? { ...group, count: group.count - 1 }
                : group
          );
        }
      });
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
        state.canLoadMore = action.payload.length === ENVS.ROOMS_ITEMS;
        if (action.payload.length > 0) {
          state.rooms =
            action.meta.arg.resultStrategy === "append"
              ? [...state.rooms, ...action.payload]
              : action.payload;
        } else {
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

export const { addRoom, updateRooms, removeRoom, resetRoom } =
  roomSlice.actions;
export default roomSlice.reducer;
