import { Clock } from './clock/Clock';

const canvas: HTMLCanvasElement = document.getElementById("Clock") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let radius = canvas.height / 2.0;
ctx.translate(radius, radius);
radius = radius * 0.90
const clock = new Clock(ctx, radius);