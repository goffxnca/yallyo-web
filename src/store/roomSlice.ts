import { AsyncState, Pagination, Room } from "@/models/types";
import { ENVS } from "@/utils/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RoomState extends AsyncState {
  rooms: Room[];
}

const initialState: RoomState = {
  rooms: [],
  status: "idle",
  error: "",
};

export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (pagination: Pagination) => {
    const endpoint = `${ENVS.API_URL}/rooms?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data as Room[];
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
    builder.addCase(fetchRooms.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.status = "success";
      state.rooms = [...state.rooms, ...action.payload];
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message ?? "Failed to fetch rooms";
    });
  },
});

export const { addRoom, updateRoom, removeRoom, resetRoom } = roomSlice.actions;
export default roomSlice.reducer;
