import { Socket, io } from "socket.io-client";
import store from "../store";
import { setElements, updateElement } from "../components/Whiteboard/Whiteboard.slice";

let socket: Socket;

export const connectWithSocketServer = () => {
	if (!socket) {
		socket = io("http://localhost:3003");

		socket.on("connect", () => {
			console.log("connected to socket.io server");
		});

		socket.on("whiteboard-state", (elements) => {
			store.dispatch(setElements(elements));
		});

		socket.on("element-update", (elementData) => {
			store.dispatch(updateElement(elementData));
		});

		socket.on("whiteboard-clear", () => {
			store.dispatch(setElements([]));
		});
	}
};

export const emitElementUpdate = (elementData: any) => {
	socket.emit("element-update", elementData);
};

export const emitClearWhiteboard = () => {
	socket.emit("whiteboard-clear");
};
