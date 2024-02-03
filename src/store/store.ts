import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import whiteboardSlice from "./whiteboard.slice";

export const store = configureStore({
	reducer: {
		whiteboard: whiteboardSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
