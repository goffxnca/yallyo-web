import { AsyncState, FirebaseUser } from "@/types/frontend";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";

interface AuthState extends AsyncState {
  user: FirebaseUser | null;
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
    assignAuth(state, action: PayloadAction<FirebaseUser>) {
      state.user = action.payload;
    },
    resetAuth(state) {
      return initialState;
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
      })
      .addCase(signoutFromGoogle.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to signout from Google";
      });
  },
});

export const { resetAuth, assignAuth } = sessionSlice.actions;
export default sessionSlice.reducer;
