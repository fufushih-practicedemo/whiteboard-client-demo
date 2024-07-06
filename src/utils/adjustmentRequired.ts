import { toolTypes } from "../constants";

export const adjustmentRequired = (type: any) => [toolTypes.RECTANGLE, toolTypes.LINE].includes(type);
