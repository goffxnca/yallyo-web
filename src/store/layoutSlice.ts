import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LayoutState {
  sessionContainerExpanded: boolean;
  lobbyContainerExpanded: boolean;
  currentActiveRoomId: string;
}

const initialState: LayoutState = {
  sessionContainerExpanded: false,
  lobbyContainerExpanded: false,
  currentActiveRoomId: "",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleLobbyContainer(state) {
      state.lobbyContainerExpanded = !state.lobbyContainerExpanded;
    },
    toggleSessionContainer(state) {
      state.sessionContainerExpanded = !state.sessionContainerExpanded;
    },
    setCurrentActiveRoomId(state, action: PayloadAction<string>) {
      state.currentActiveRoomId = action.payload;
    },
  },
});

export const {
  toggleSessionContainer,
  toggleLobbyContainer,
  setCurrentActiveRoomId,
} = layoutSlice.actions;
export default layoutSlice.reducer;
