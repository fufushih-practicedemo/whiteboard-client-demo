import { cursorPosition, toolTypes } from "../constants";

const nearPoint = (x: number, y: number, x1: number, y1: number, cursorPosition: any) => {
	return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? cursorPosition : null;
};

const positionWithElement = (x: number, y: number, element: any) => {
	const { type, x1, x2, y1, y2 } = element;

	switch (type) {
		case toolTypes.RECTANGLE: {
			const topLeft = nearPoint(x, y, x1, y1, cursorPosition.TOP_LEFT);
			const topRight = nearPoint(x, y, x2, y1, cursorPosition.TOP_RIGHT);
			const bottomLeft = nearPoint(x, y, x1, y2, cursorPosition.BOTTOM_LEFT);
			const bottomRight = nearPoint(x, y, x2, y2, cursorPosition.BOTTOM_RIGHT);
			const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? cursorPosition.INSIDE : null;
			return topLeft || topRight || bottomLeft || bottomRight || inside;
		}
		case toolTypes.TEXT: {
			return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? cursorPosition.INSIDE : null;
		}
		default:
			break;
	}
};

export const getElementAtPosition = (x: number, y: number, elements: any[]) => {
	return elements
		.map((el) => ({
			...el,
			position: positionWithElement(x, y, el),
		}))
		.find((el: any) => el.position !== null && el.position !== undefined);
};
