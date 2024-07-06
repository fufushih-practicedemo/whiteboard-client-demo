import { RoughCanvas } from "roughjs/bin/canvas";
import { toolTypes } from "../constants";

export const drawElement = ({
	roughCanvas,
	context,
	element,
}: {
	roughCanvas: RoughCanvas;
	context: CanvasRenderingContext2D | null;
	element: any;
}) => {
	switch (element.type) {
		case toolTypes.RECTANGLE:
		case toolTypes.LINE:
			return roughCanvas.draw(element.roughElement);
		default:
			throw new Error("Something went wrong when drawing element");
	}
};
