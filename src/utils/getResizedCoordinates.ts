import { cursorPosition } from "../constants";

export const getResizedCoordinates = (clientX: number, clientY: number, position: any, coordinates: any) => {
	const { x1, y1, x2, y2 } = coordinates;

	switch (position) {
		case cursorPosition.START:
		case cursorPosition.TOP_LEFT:
			return { x1: clientX, y1: clientY, x2, y2 };
		case cursorPosition.TOP_RIGHT:
			return { x1, y1: clientY, x2: clientX, y2 };
		case cursorPosition.BOTTOM_LEFT:
			return { x1: clientX, y1, x2, y2: clientY };
		case cursorPosition.END:
		case cursorPosition.BOTTOM_RIGHT:
			return { x1, y1, x2: clientX, y2: clientY };
		default:
			return null;
	}
};
