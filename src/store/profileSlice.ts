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

export const updateProfileAsync = createAsyncThunk(
  "updateProfileAsync",
  async (updatedProfileData: any, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;
    const endpoint = `${ENVS.API_URL}/auth/me`;

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${currentState.auth.user?.idToken}`,
      },
      body: JSON.stringify(updatedProfileData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const updatedUser = await response.json();
    return updatedUser as IUser;
  }
);

export const fetchShortProfileByIdAsync = createAsyncThunk(
  "fetchShortProfileByIdAsync",
  async (userId: string) => {
    //TODO: We might re-consider again, if we should allow non logged-in user to see other user profiles or not
    const endpoint = `${ENVS.API_URL}/users/${userId}/shortProfile`;
    const response = await fetch(endpoint);

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

    builder
      .addCase(updateProfileAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.profile = action.payload;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to update my profile";
        console.error("updateProfileAsync failed with error", action.error);
      });
  },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
