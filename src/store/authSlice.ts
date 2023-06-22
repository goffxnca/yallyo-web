import { IAsyncState, IFirebaseUser } from "@/types/frontend";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";

interface AuthState extends IAsyncState {
  user: IFirebaseUser | null;
}

const initialState: AuthState = {
  status: "idle",
  error: "",
  user: null,
};

export const signinWithGoogle = createAsyncThunk(
  "auth/signinWithGoogle",
  async () => {
    await signInWithPopup(auth, googleAuthProvider);
  }
);

export const signoutFromGoogle = createAsyncThunk("auth/signOut", async () => {
  await signOut(auth);
});

const sessionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    assignSuccessAuth(state, action: PayloadAction<IFirebaseUser>) {
      state.user = action.payload;
      state.status = "success";
    },
    assignErrorAuth(_) {
      return { ...initialState, status: "error" };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signinWithGoogle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signinWithGoogle.fulfilled, (state, action) => {
        state.status = "success";
        // state.user = action.payload; //this being handle in onAuthStateChanged callback instead
      })
      .addCase(signinWithGoogle.rejected, (state, action) => {
        if (action.error.code === "auth/popup-closed-by-user") {
          return initialState;
        } else {
          state.status = "error";
          state.error = action.error.message ?? "Failed to signin with Google";
        }
      });

    builder
      .addCase(signoutFromGoogle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signoutFromGoogle.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = null;
        window.location.href = "/";
      })
      .addCase(signoutFromGoogle.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to signout from Google";
      });
  },
});

export const { assignSuccessAuth, assignErrorAuth } = sessionSlice.actions;
export default sessionSlice.reducer;
