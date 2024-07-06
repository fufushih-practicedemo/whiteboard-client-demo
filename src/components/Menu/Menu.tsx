import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolTypes } from "../../constants";
import rectangeIcon from "../../resources/icons/rectangle.svg";
import lineIcon from "../../resources/icons/line.svg";
import { setToolType } from "../Whiteboard/Whiteboard.slice";
import { RootState } from "../../store";

const IconButton = ({ src, type }: { src: string; type: string }) => {
	const dispatch = useDispatch();

	const selectedToolType = useSelector((state: RootState) => state.whiteboard.tool);

	const handleToolChange = () => {
		dispatch(setToolType(type));
	};

	return (
		<button onClick={handleToolChange} className={selectedToolType === type ? "menu_button_active" : "menu_button"}>
			<img width="80%" height="80%" src={src} />
		</button>
	);
};

const Menu = () => {
	return (
		<div className="menu_container">
			<IconButton src={rectangeIcon} type={toolTypes.RECTANGLE} />
			<IconButton src={lineIcon} type={toolTypes.LINE} />
		</div>
	);
};

export default Menu;
