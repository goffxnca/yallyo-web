import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UiState {
  theme: string;
  lang: string;
  isLoading: boolean;
}

const initialState: UiState = {
  theme: "",
  lang: "",
  isLoading: false,
};

const commonSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
    changeLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
    showLoading(state) {
      state.isLoading = true;
    },
  },
});

export const { changeTheme, changeLanguage, showLoading } = commonSlice.actions;
export default commonSlice.reducer;
