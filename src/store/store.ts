import {
  Action,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import roomReducer from "./roomSlice";
import appReducer from "./appSlice";
import sessionSlice from "./sessionSlice";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import accountSlice from "./accountSlice";
import lobbyChatSlice from "./lobbyChatSlice";
import lobbyChatStockSlice from "./lobbyChatStockSlice";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authSlice,
  room: roomReducer,
  session: sessionSlice,
  profile: profileSlice,
  account: accountSlice,
  lobbyChat: lobbyChatSlice,
  lobbyChatStock: lobbyChatStockSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // devTools: true,
});

export type RootState = ReturnType<typeof store.getState>; //A Type for useSelector
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>; //A type for useDispatch
export default store;
