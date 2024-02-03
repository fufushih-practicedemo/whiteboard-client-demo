import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolTypes } from "../../constants";
import rectangeIcon from "../../resources/icons/rectangle.svg";
import { setToolType } from "../../store/whiteboard.slice";

const IconButton = ({ src, type }: { src: string; type: string }) => {
	const dispatch = useDispatch();

	const slectedToolType = useSelector((state: any) => state.whiteboard.toolType);

	const handleToolChange = () => {
		dispatch(setToolType(type));
	};

	return (
		<button onClick={handleToolChange} className={slectedToolType === type ? "menu_button_active" : "menu_button"}>
			<img width="80%" height="80%" src={src} />
		</button>
	);
};

const Menu = () => {
	return (
		<div className="menu_container">
			<IconButton src={rectangeIcon} type={toolTypes.RECTANGLE} />
		</div>
	);
};

export default Menu;
