import { IAlert } from "@/types/frontend";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UiState {
  visible: boolean;
  alertInfo: IAlert;
}

const initialState: UiState = {
  visible: false,
  alertInfo: {
    mode: "info",
    title: "Title",
    message: "Message",
    buttonText: "",
    buttonLink: "",
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<IAlert>) {
      state.alertInfo = action.payload;
      state.visible = true;
    },
    hideAlert(state) {
      state.visible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
