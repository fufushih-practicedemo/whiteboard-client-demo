import { cursorPosition, toolTypes } from "../constants";

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
	Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const nearPoint = (x: number, y: number, x1: number, y1: number, cursorPosition: any) => {
	return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? cursorPosition : null;
};

const onLine = ({
	x1,
	y1,
	x2,
	y2,
	x,
	y,
	maxDistance = 1,
}: {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	x: number;
	y: number;
	maxDistance?: number;
}) => {
	const a = { x: x1, y: y1 };
	const b = { x: x2, y: y2 };
	const c = { x, y };

	const offset = distance(a, b) - (distance(a, c) + distance(b, c));

	return Math.abs(offset) < maxDistance ? cursorPosition.INSIDE : null;
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
		case toolTypes.LINE: {
			const on = onLine({ x1, y1, x2, y2, x, y });
			const start = nearPoint(x, y, x1, y2, cursorPosition.START);
			const end = nearPoint(x, y, x2, y2, cursorPosition.END);

			return start || end || on;
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
