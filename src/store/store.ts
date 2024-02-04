import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import whiteboardSlice from "../components/Whiteboard/Whiteboard.slice";

export const store = configureStore({
	reducer: {
		whiteboard: whiteboardSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["whiteboard/setElements"],
				ignorePath: ["whiteboard.elements"],
			},
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
