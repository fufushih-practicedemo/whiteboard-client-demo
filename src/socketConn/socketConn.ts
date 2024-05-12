import { Socket, io } from "socket.io-client";

let socket: Socket;

export const connectWithSocketServer = () => {
	if (!socket) {
		socket = io("http://localhost:3003");

		socket.on("connect", () => {
			console.log("connected to socket.io server");
		});
	}
};
