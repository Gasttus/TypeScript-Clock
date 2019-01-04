import { Face } from './Face';
import { Hand } from './Hand';
import { ManualClockState } from './states/ManualClockState';
import { AutoClockState } from './states/AutoClockState';
import { BaseClockState } from './states/BaseClockState';

export class Clock {
    private time: Date = new Date();
    private state: BaseClockState = new AutoClockState(this.ctx, this.radius, this.time, "");
    private update;
    private clickedColor = "";
    protected handsColors = ["#a941f4", "#41e5f4", "#dcf441"];

    constructor(private ctx: CanvasRenderingContext2D, private radius: number) {
        this.setAutoClockUpdate();
        this.ctx.canvas.addEventListener("click", this.canvasClicked_Event.bind(this));
    }

    private canvasClicked_Event(event) {
        let cursorPosition = this.getCursorPositionOnCanvas(this.ctx.canvas, event);
        let newclickedColor = this.getHexColorFromPosition(cursorPosition.x, cursorPosition.y);

        if ((this.handsColors.indexOf(this.clickedColor) > -1 && this.handsColors.indexOf(newclickedColor) > -1) || this.handsColors.indexOf(newclickedColor) === -1) {
            this.clickedColor = "";
            this.state.onDestroy();
            this.state = new AutoClockState(this.ctx, this.radius, this.time, this.clickedColor);
            this.setAutoClockUpdate();
        } else {
            this.clickedColor = newclickedColor;
            this.state.onDestroy();
            this.state = new ManualClockState(this.ctx, this.radius, this.time, this.clickedColor);
            this.setManualClockUpdate();
        }
    }

    private getCursorPositionOnCanvas(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        return { x: x, y: y };
    }

    private rgbToHex(r, g, b) {
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    private getHexColorFromPosition(x, y) {
        let imageData = this.ctx.getImageData(x, y, 1, 1).data;
        return "#" + ("000000" + this.rgbToHex(imageData[0], imageData[1], imageData[2])).slice(-6);
    }


    private setAutoClockUpdate() {
        if (this.update) {
            clearInterval(this.update);
        }
        this.draw();
        this.update = setInterval(() => {
            this.draw();
        }, 1000);
    }

    private setManualClockUpdate() {
        if (this.update) {
            clearInterval(this.update);
        }
        this.update = setInterval(() => {
            this.draw();
        }, 25);
    }

    public draw() {
        this.state.update();
    }
}