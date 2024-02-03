import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import whiteboardSlice from "./whiteboard";

export const store = configureStore({
  reducer: {
    whiteboard: whiteboardSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
