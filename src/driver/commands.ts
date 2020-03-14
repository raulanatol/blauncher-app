import { Pixel } from "./Pixel";

const toRef = pixel => pixel.ref;

export const drawPixelCommand = (pixels: Pixel[]) => `DP#${pixels.map(toRef).join('')}`;
export const clearBoard = () => 'CLS#';



