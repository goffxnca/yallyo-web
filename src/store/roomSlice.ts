import {
  IAsyncState,
  RoomFetchOptions,
  RoomsGroupedByLanguage,
} from "@/types/frontend";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { RootState } from "./store";
import {
  IPagination,
  IRoom,
  IRoomFilter,
  IRoomSocketUpdate,
} from "@/types/common";

interface RoomState extends IAsyncState {
  rooms: IRoom[];
  roomsGroupedByLanguage: RoomsGroupedByLanguage[];
  canLoadMore: boolean;
  filters: IRoomFilter;
  recentCreatedRoomId: string;
}

const initialState: RoomState = {
  rooms: [],
  roomsGroupedByLanguage: [],
  status: "idle", //TODO: this status is buggy because all of async functions here that run simutinously migth overwrite each others status
  error: "",
  canLoadMore: true,
  filters: {
    language: "",
    level: "",
    topic: "",
  },
  recentCreatedRoomId: "",
};

export const fetchRoomsAsync = createAsyncThunk(
  "room/fetchRooms",
  async (options: RoomFetchOptions) => {
    const endpoint = `${ENVS.API_URL}/rooms?language=${options.filters?.language}&level=${options.filters?.level}&topic=${options.filters?.topic}&pnum=${options.pagination.pnum}&psize=${options.pagination.psize}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as IRoom[];
  }
);

export const fetchRoomsGroupedByLanguageAsync = createAsyncThunk(
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

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (room: any, thunkAPI) => {
    const payload: IRoom = {
      ...room,
      order: Date.now().toString(),
      size: +room.size,
    };

    const currentState = thunkAPI.getState() as RootState;

    const endpoint = `${ENVS.API_URL}/rooms`;
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
    const createdRoom = await response.json();
    return createdRoom as IRoom;
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

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addRoom(state, action: PayloadAction<IRoom>) {
      state.rooms.push(action.payload);
    },
    updateRooms(state, action: PayloadAction<IRoomSocketUpdate[]>) {
      const { language, level, topic } = state.filters;
      const hasFilters = !!language || !!level || !!topic;

      action.payload.forEach((roomUpdate) => {
        //Create
        if (roomUpdate.updateStatus === "C") {
          //Determine if adding new updates to room list choose be skipped, by checking incomings room updates againts current filters
          let skipAddingToRoomList = false;
          let languageMatch = true,
            levelMatch = true,
            topicMatch = true;
          if (hasFilters) {
            if (language) {
              languageMatch = roomUpdate.language === language;
            }
            if (level) {
              levelMatch = roomUpdate.level === level;
            }
            if (topic) {
              topicMatch = roomUpdate.topic === topic;
            }
          }
          skipAddingToRoomList = !languageMatch || !levelMatch || !topicMatch;

          console.log(skipAddingToRoomList);

          const existingRoom = state.rooms.find(
            (r) => r._id === roomUpdate._id
          );
          if (existingRoom) {
            return state;
          }

          if (!skipAddingToRoomList) {
            state.rooms = [roomUpdate, ...state.rooms];
          }

          //If room count by language already exist, add +1 to it
          state.roomsGroupedByLanguage = state.roomsGroupedByLanguage.map(
            (group) =>
              group.language === roomUpdate.language
                ? { ...group, count: group.count + 1 }
                : group
          );

          //If room count by language is not exist, manually assign 1
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
    updateFilters(state, action: PayloadAction<IRoomFilter>) {
      state.filters = { ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRoomsAsync.pending, (state, action) => {
        state.status = "loading";
        state.canLoadMore = true;
      })
      .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.canLoadMore = action.payload.length === ENVS.ROOMS_ITEMS;
        if (action.payload.length > 0) {
          if (action.meta.arg.resultStrategy === "append") {
            const tempRooms = [...state.rooms];
            action.payload.forEach((newRoom) => {
              let targetRoom = tempRooms.find((r) => r._id === newRoom._id);
              if (targetRoom) {
                console.log(
                  "Found existing deplicate room but skipped" + targetRoom._id
                );
              } else {
                tempRooms.push(newRoom);
              }
            });
            state.rooms = tempRooms;
          } else if (action.meta.arg.resultStrategy === "replace") {
            state.rooms = action.payload;
          }
        } else {
          if (action.meta.arg.pagination.pnum === 1) {
            state.rooms = [];
          }
        }
      })
      .addCase(fetchRoomsAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch rooms";
      });

    builder
      .addCase(fetchRoomsGroupedByLanguageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoomsGroupedByLanguageAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.roomsGroupedByLanguage = _.orderBy(
          action.payload,
          ["count", "language"],
          ["desc", "asc"]
        );
      })
      .addCase(fetchRoomsGroupedByLanguageAsync.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message ?? "Failed to fetch room count by language";
      });

    builder
      .addCase(createRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = "success";
        state.recentCreatedRoomId = action.payload._id!;
        // state.rooms = [action.payload, ...state.rooms];
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to create room";
      });
  },
});

export const { addRoom, updateRooms, removeRoom, resetRoom, updateFilters } =
  roomSlice.actions;
export default roomSlice.reducer;
