import rough from "roughjs";
import { toolTypes } from "../constants";

const generator = rough.generator();

const generateRectangle = ({ x1, y1, x2, y2 }: any) => {
	return generator.rectangle(x1, y1, x2 - x1, y2 - y1);
};

export const createElement = ({ x1, y1, x2, y2, toolType, id }: any) => {
	let roughElement;
	console.log("toolType", toolType);
	switch (toolType) {
		case toolTypes.RECTANGLE:
			roughElement = generateRectangle({ x1, y1, x2, y2 });
			return {
				id: id,
				roughElement,
				type: toolType,
				x1,
				y1,
				x2,
				y2,
			};
		default:
			throw new Error("Something went wrong when creating element");
	}
};
