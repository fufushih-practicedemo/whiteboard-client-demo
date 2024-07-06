import React, { TextareaHTMLAttributes, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import rough from "roughjs";
import { v4 as uuid } from "uuid";
import { actions, toolTypes } from "../../constants";
import { adjustElementCoordinates, adjustmentRequired, createElement, drawElement, updateElement } from "../../utils";
import Menu from "../Menu";
import { updateElement as updateElementInStore } from "./Whiteboard.slice";
import { RootState } from "../../store/store";
import { WhiteboardElement } from "./Whiteboard-types";

const Whiteboard = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const toolType = useSelector((state: RootState) => state.whiteboard.tool);
	const elements = useSelector((state: RootState) => state.whiteboard.elements);

	const [action, setAction] = React.useState<string | null>(null);
	const [selectedElement, setSelectedElement] = useState<any>(null);

	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const canvas = canvasRef.current;

		if (canvas) {
			const ctx = canvas?.getContext("2d");

			ctx?.clearRect(0, 0, canvas.width, canvas.height);

			const roughCanvas = rough.canvas(canvas);

			elements.forEach((element: WhiteboardElement) => {
				drawElement({ roughCanvas, context: ctx, element });
			});
		}
	}, [elements]);

	const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const { clientX, clientY } = event;

		if (selectedElement && action === actions.WRITTING) {
			return;
		}

		const element = createElement({
			x1: clientX,
			y1: clientY,
			x2: clientX,
			y2: clientY,
			toolType,
			id: uuid(),
		});

		switch (toolType) {
			case toolTypes.RECTANGLE:
			case toolTypes.LINE:
			case toolTypes.PENCIL: {
				setAction(actions.DRAWING);
				break;
			}
			case toolTypes.TEXT: {
				setAction(actions.WRITTING);
				break;
			}
		}

		setSelectedElement(element);

		dispatch(updateElementInStore(element));
	};

	const handleMouseUp = () => {
		const selectedElementIndex = elements.findIndex((el: WhiteboardElement) => el.id === selectedElement?.id);

		if (selectedElementIndex !== -1) {
			if (action === actions.DRAWING) {
				if (adjustmentRequired(elements[selectedElementIndex].type)) {
					const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[selectedElementIndex]);

					updateElement(
						{
							id: selectedElement?.id,
							index: selectedElementIndex,
							x1,
							x2,
							y1,
							y2,
							type: elements[selectedElementIndex].type,
						},
						elements,
					);
				}
			}
		}

		setAction(null);
		setSelectedElement(null);
	};

	const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const { clientX, clientY } = event;

		if (action === actions.DRAWING) {
			const index = elements.findIndex((element: WhiteboardElement) => element.id === selectedElement?.id);

			if (index !== -1) {
				updateElement(
					{
						index,
						id: elements[index].id,
						x1: elements[index].x1,
						y1: elements[index].y1,
						x2: clientX,
						y2: clientY,
						type: elements[index].type,
					},
					elements,
				);
			}
		}
	};

	const handleTextareaBlur: TextareaHTMLAttributes<HTMLTextAreaElement>["onBlur"] = (event) => {
		const { id, x1, y1, type } = selectedElement;

		const index = elements.findIndex((el) => el.id === selectedElement.id);

		if (index !== -1) {
			updateElement({ id, x1, y1, type, text: event.target.value, index }, elements);

			setAction(null);
			setSelectedElement(null);
		}
	};

	return (
		<>
			<Menu />
			{action === actions.WRITTING ? (
				<textarea
					ref={textAreaRef}
					onBlur={handleTextareaBlur}
					style={{
						position: "absolute",
						top: selectedElement.y1 - 3,
						left: selectedElement.x1,
						font: "24px sans-serif",
						margin: 0,
						padding: 0,
						border: 0,
						outline: 0,
						overflow: "hidden",
						whiteSpace: "pre",
						background: "transparent",
					}}
				/>
			) : null}
			<canvas
				id="canvas"
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				ref={canvasRef}
				width={window.innerWidth}
				height={window.innerHeight}
			/>
		</>
	);
};

export default Whiteboard;
