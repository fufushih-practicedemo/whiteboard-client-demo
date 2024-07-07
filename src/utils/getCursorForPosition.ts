import { cursorPosition } from "../constants";

export const getCursorForPosition = (position: any) => {
	switch (position) {
		case cursorPosition.TOP_LEFT:
		case cursorPosition.BOTTOM_RIGHT:
		case cursorPosition.START:
		case cursorPosition.END:
			return "nwse-resize";
		case cursorPosition.TOP_RIGHT:
		case cursorPosition.BOTTOM_LEFT:
			return "nesw-resize";
		default:
			return "move";
	}
};
