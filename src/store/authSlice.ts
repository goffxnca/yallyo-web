// Auth slice is collection of actions for authentication
import { IAsyncState, IFirebaseUser } from "@/types/frontend";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";
import { generateRandomAlphaNumeric } from "@/utils/string-utils";

interface AuthState extends IAsyncState {
  user: IFirebaseUser | null;
  isGeneratingTempUser: boolean;
  userStateVerified: boolean;
}

const initialState: AuthState = {
  user: null,
  isGeneratingTempUser: false,
  userStateVerified: false,
  status: "idle",
  error: "",
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

export const generateTempUserAsync = createAsyncThunk(
  "auth/generateTempUserAsync",
  async () => {
    return new Promise<IFirebaseUser>(async (resolve, reject) => {
      try {
        const tempEmail = `${generateRandomAlphaNumeric(7)}@yallyo.com`;
        const tempPassword = "123456789";

        const generatedUser = await createUserWithEmailAndPassword(
          auth,
          tempEmail,
          tempPassword
        );

        await signOut(auth);

        let tries = 0; // Initialize the number of tries
        const delayOfEachTry = 5000;
        const signInWithRetry = async () => {
          try {
            const signInResult = await signInWithEmailAndPassword(
              auth,
              tempEmail,
              tempPassword
            );
            tries++;
            console.log("try" + tries);

            const { uid, email, displayName, photoURL } = signInResult.user;

            if (displayName && photoURL) {
              const authData: IFirebaseUser = {
                uid,
                email: email!,
                displayName,
                photoURL,
                idToken: (signInResult.user as any).accessToken,
                type1: "t",
              };

              resolve(authData); // Resolve the Promise to indicate completion and return display name to show in alert
            } else {
              if (tries === 5) {
                const errorMessage =
                  "Fetching for a temp user with ready state failed after 3 tries";
                console.error(errorMessage);
                reject(new Error(errorMessage));
              } else {
                setTimeout(signInWithRetry, delayOfEachTry); // Retry after 5 seconds
              }
            }
          } catch (error) {
            reject(error); // Reject the Promise if an error occurs
          }
        };

        setTimeout(signInWithRetry, delayOfEachTry);

        // setTimeout(async () => {
        //   try {
        //     const signInResult = await signInWithEmailAndPassword(
        //       auth,
        //       email,
        //       password
        //     );

        //     const { displayName, photoURL } = signInResult.user;

        //     if (displayName && photoURL) {
        //       resolve(signInResult.user!); // Resolve the Promise to indicate completion and return display name to show in alert
        //     }else{
        //       //we can try more 2 times but each every 5 seconds until display&name available we stop trying and resolve
        //     }
        //   } catch (error) {
        //     reject(error); // Reject the Promise if an error occurs
        //   }
        // }, 5000);
      } catch (error) {
        reject(error); // Reject the Promise if an error occurs
      }
    });
  }
);

const sessionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    assignSuccessAuth(state, action: PayloadAction<IFirebaseUser>) {
      state.user = action.payload;
      state.status = "success";
      state.userStateVerified = true;
    },
    assignErrorAuth(state) {
      // return { ...initialState, status: "error" };
      state.user = null;
      state.userStateVerified = true;
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
      .addCase(generateTempUserAsync.pending, (state) => {
        state.isGeneratingTempUser = true;
      })
      .addCase(generateTempUserAsync.fulfilled, (state) => {
        state.isGeneratingTempUser = false;
      })
      .addCase(generateTempUserAsync.rejected, (state, action) => {
        state.isGeneratingTempUser = false;
        state.error =
          action.error.message ?? "Failed to generate temporary user";
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
