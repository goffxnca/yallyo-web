import {
  Action,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import roomReducer from "./roomSlice";
import appReducer from "./appSlice";
import sessionSlice from "./sessionSlice";

const rootReducer = combineReducers({
  app: appReducer,
  room: roomReducer,
  session: sessionSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; //A Type for useSelector
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>; //A type for useDispatch
export default store;
