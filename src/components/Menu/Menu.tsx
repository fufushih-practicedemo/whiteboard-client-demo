import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolTypes } from "../../constants";
import rectangeIcon from "../../resources/icons/rectangle.svg";
import lineIcon from "../../resources/icons/line.svg";
import rubberIcon from "../../resources/icons/rubber.svg";
import pencilIcon from "../../resources/icons/pencil.svg";
import textIcon from "../../resources/icons/text.svg";
import selectionIcon from "../../resources/icons/selection.svg";
import { setElements, setToolType } from "../Whiteboard/Whiteboard.slice";
import { RootState } from "../../store";
import { emitClearWhiteboard } from "../../socketConn/socketConn";

const IconButton = ({ src, type = "", isRubber }: { src: string; type?: string; isRubber?: boolean }) => {
	const dispatch = useDispatch();

	const selectedToolType = useSelector((state: RootState) => state.whiteboard.tool);

	const handleToolChange = () => {
		dispatch(setToolType(type));
	};

	const handleClearCanvas = () => {
		dispatch(setElements([]));

		emitClearWhiteboard();
	};

	return (
		<button
			onClick={isRubber ? handleClearCanvas : handleToolChange}
			className={selectedToolType === type ? "menu_button_active" : "menu_button"}
		>
			<img width="80%" height="80%" src={src} />
		</button>
	);
};

const Menu = () => {
	return (
		<div className="menu_container">
			<IconButton src={rectangeIcon} type={toolTypes.RECTANGLE} />
			<IconButton src={lineIcon} type={toolTypes.LINE} />
			<IconButton src={rubberIcon} isRubber />
			<IconButton src={pencilIcon} type={toolTypes.PENCIL} />
			<IconButton src={textIcon} type={toolTypes.TEXT} />
			<IconButton src={selectionIcon} type={toolTypes.SELECTION} />
		</div>
	);
};

export default Menu;
