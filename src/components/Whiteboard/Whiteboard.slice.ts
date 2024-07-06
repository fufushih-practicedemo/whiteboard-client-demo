import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WhiteboardElement } from "./Whiteboard-types";

const initialState: {
	tool: string | null;
	elements: WhiteboardElement[];
} = {
	tool: null,
	elements: [],
};

const whiteboardSlice = createSlice({
	name: "whiteboard",
	initialState,
	reducers: {
		setToolType: (state, action: PayloadAction<string>) => {
			state.tool = action.payload;
		},
		updateElement: (state, action: PayloadAction<WhiteboardElement>) => {
			const { id } = action.payload;

			const index = state.elements.findIndex((element) => element.id === id);

			if (index === -1) {
				state.elements.push(action.payload);
			} else {
				state.elements[index] = action.payload;
			}
		},
		setElements: (state, action: PayloadAction<WhiteboardElement[]>) => {
			state.elements = action.payload;
		},
	},
});

export const { setToolType, updateElement, setElements } = whiteboardSlice.actions;

export default whiteboardSlice.reducer;
