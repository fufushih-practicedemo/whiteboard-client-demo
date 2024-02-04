import { toolTypes } from "../constants";

export const adjustmentRequired = (type: any) => [toolTypes.RECTANGLE].includes(type);
