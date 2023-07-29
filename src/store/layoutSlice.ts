import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LayoutState {
  roomsContainerExpanded: boolean;
  lobbyContainerExpanded: boolean;
  currentActiveRoomId: string;
}

const initialState: LayoutState = {
  roomsContainerExpanded: true,
  lobbyContainerExpanded: true,
  currentActiveRoomId: "",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleRoomContainer(state) {
      state.roomsContainerExpanded = !state.roomsContainerExpanded;
    },
    toggleLobbyContainer(state) {
      state.lobbyContainerExpanded = !state.lobbyContainerExpanded;
    },
    setCurrentActiveRoomId(state, action: PayloadAction<string>) {
      state.currentActiveRoomId = action.payload;
    },
  },
});

export const {
  toggleRoomContainer,
  toggleLobbyContainer,
  setCurrentActiveRoomId,
} = layoutSlice.actions;
export default layoutSlice.reducer;
