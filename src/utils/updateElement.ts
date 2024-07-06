import { createElement } from ".";
import { setElements } from "../components/Whiteboard/Whiteboard.slice";
import { toolTypes } from "../constants";
import { emitElementUpdate } from "../socketConn/socketConn";
import { store } from "../store/store";

export const updateElement = ({ id, x1, x2, y1, y2, type, index }: any, elements: any[]) => {
	const elementsCopy = [...elements];

	switch (type) {
		case toolTypes.RECTANGLE: {
			const updateElement = createElement({
				id,
				x1,
				y1,
				x2,
				y2,
				toolType: type,
			});

			elementsCopy[index] = updateElement;

			store.dispatch(setElements(elementsCopy));
			emitElementUpdate(updateElement);
			break;
		}
		default:
			throw new Error("Something went wrong when updating element");
	}
};
