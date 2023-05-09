import {
  Action,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import roomReducer from "./roomSlice";
import commonReducer from "./appSlice";

const rootReducer = combineReducers({
  room: roomReducer,
  common: commonReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; //A Type for useSelector
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>; //A type for useDispatch
export default store;
