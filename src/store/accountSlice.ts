// Account slice is collection of actions for individual profile
import { IAsyncState } from "@/types/frontend";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENVS } from "@/utils/constants";
import { IFollow, IUser } from "@/types/common";
import { RootState } from "./store";

interface AuthState extends IAsyncState {
  account: IUser | null;
}

const initialState: AuthState = {
  status: "idle",
  account: null,
  error: "",
};

export const fetchShortProfileByIdAsync = createAsyncThunk(
  "fetchShortProfileByIdAsync",
  async (userId: string, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;
    const endpoint = `${ENVS.API_URL}/users/${userId}/${
      currentState.auth.user ? "shortProfile2" : "shortProfile"
    }`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${currentState.auth.user?.idToken}`,
      },
    });

    const responseBody = await response.json();
    if (!response.ok) {
      throw new Error(responseBody.message);
    }

    return responseBody as IUser;
  }
);

export const followAccountAsync = createAsyncThunk(
  "followAccountAsync",
  async (followeeId: any, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;

    const endpoint = `${ENVS.API_URL}/follows/${followeeId}/follow`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${currentState.auth.user?.idToken}`,
      },
    });

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody.message);
    }

    return responseBody as IFollow;
  }
);

export const unfollowAccountAsync = createAsyncThunk(
  "unfollowAccountAsync",
  async (followeeId: any, thunkAPI) => {
    const currentState = thunkAPI.getState() as RootState;

    const endpoint = `${ENVS.API_URL}/follows/${followeeId}/unfollow`;
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${currentState.auth.user?.idToken}`,
      },
    });

    if (!response.ok) {
      const responseBody = await response.json();
      throw new Error(responseBody.message);
    }

    return null;
  }
);

const profileSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetAccount(state) {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShortProfileByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchShortProfileByIdAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.account = action.payload;
      })
      .addCase(fetchShortProfileByIdAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to fetch my profile";
        console.error(
          "fetchShortProfileByIdAsync failed with error: ",
          state.error
        );
      });

    builder
      .addCase(followAccountAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(followAccountAsync.fulfilled, (state, action) => {
        state.status = "success";
        if (state.account) {
          state.account = {
            ...state.account,
            followers: state.account.followers + 1,
            isFollowing: true,
          };
        }
      })
      .addCase(followAccountAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to follow account";
        console.error("followAccountAsync failed with error: ", state.error);
      });

    builder
      .addCase(unfollowAccountAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(unfollowAccountAsync.fulfilled, (state, action) => {
        state.status = "success";
        if (state.account) {
          state.account = {
            ...state.account,
            followers: state.account.followers - 1,
            isFollowing: false,
          };
        }
      })
      .addCase(unfollowAccountAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to unfollow account";
        console.error("unfollowAccountAsync failed with error: ", state.error);
      });
  },
});

export const { resetAccount } = profileSlice.actions;
export default profileSlice.reducer;
