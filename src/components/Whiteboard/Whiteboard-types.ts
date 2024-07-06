export interface WhiteboardElement {
	id: string;
	type: string;
	x1?: number;
	y1?: number;
	x2?: number;
	y2?: number;
	points?: {
		x?: number;
		y?: number;
	}[];
	[key: string]: any;
}

export interface WhiteboardState {
	tool: string | null;
	elements: WhiteboardElement[];
}
