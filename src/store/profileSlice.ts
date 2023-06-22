import { IAsyncState } from "@/types/frontend";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENVS } from "@/utils/constants";
import { IUser } from "@/types/common";
import { RootState } from "./store";

interface AuthState extends IAsyncState {
  profile: IUser | null;
}

const initialState: AuthState = {
  status: "idle",
  profile: null,
  error: "",
};

export const fetchProfileAsync = createAsyncThunk(
  "fetchProfileAsync",
  async (_, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;
    const endpoint = `${ENVS.API_URL}/auth/me`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${currentState.auth.user?.idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data as IUser;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfileAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfileAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.profile = action.payload;
      })
      .addCase(fetchProfileAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch my profile";
      });
  },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
