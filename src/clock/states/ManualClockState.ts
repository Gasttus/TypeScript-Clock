import { BaseClockState } from "./BaseClockState";

export class ManualClockState extends BaseClockState {
    private angle: number = 0;
    private mouseSegment: number;
    private previouseMouseSegment: number;
    private mousePosition: { x: number, y: number };
    private segmentChanged_Event = new Event('segmentChanged');
    private isDestroyed = false;


    constructor(protected ctx: CanvasRenderingContext2D, protected radius: number, private time, private hexClickedColor: string) {
        super(ctx, radius);
        this.angle = this.getBeginningAngleInRadians(hexClickedColor) * (180 / Math.PI);
        document.addEventListener("mousemove", this.onMouseMove_Event.bind(this), false);
        this.ctx.canvas.addEventListener("segmentChanged", this.onSegmentChanged_Event.bind(this), false);
    }

    private getBeginningAngleInRadians(color: string): number {
        switch (color) {
            case this.handsColors[0]:
                return this.time.getSeconds() * Math.PI / 30;
            case this.handsColors[1]:
                return ((this.time.getMinutes() + this.time.getSeconds() / 60) * Math.PI / 30);
            case this.handsColors[2]:
                return (this.time.getHours() + this.time.getMinutes() / 60) * Math.PI / 6
        }
    }

    public onDestroy() {
        this.isDestroyed = true;
    }

    public update() {
        this.draw(this.getSecondsAngle(), this.getMinutesAngle(), this.getHoursAngle());
    }

    private onSegmentChanged_Event(event) {
        if (this.isDestroyed) {
            return;
        }
        if (this.mouseSegment === 1 && this.previouseMouseSegment === 4 && this.hexClickedColor == "#a941f4") {
            this.time.setMinutes(this.time.getMinutes() + 1);
        }

        if (this.mouseSegment === 4 && this.previouseMouseSegment === 1 && this.hexClickedColor == "#a941f4") {
            this.time.setMinutes(this.time.getMinutes() - 1);
        }

        if (this.mouseSegment === 1 && this.previouseMouseSegment === 4 && this.hexClickedColor == "#41e5f4") {
            this.time.setHours(this.time.getHours() + 1);
        }

        if (this.mouseSegment === 4 && this.previouseMouseSegment === 1 && this.hexClickedColor == "#41e5f4") {
            this.time.setHours(this.time.getHours() - 1);
        }
    }

    private onMouseMove_Event(event) {
        if (this.isDestroyed) {
            return;
        }
        this.mousePosition = this.getCursorPositionOnCanvas(this.ctx.canvas, event);
        this.calculateMouseSegment(this.mousePosition.x, this.mousePosition.y);

        this.angle = this.angleCalcStartAndEnd(this.mousePosition.x, this.mousePosition.y);


        if (this.hexClickedColor == this.handsColors[0]) {
            this.time.setSeconds(this.angle / 6);
        }
        if (this.hexClickedColor == this.handsColors[1]) {
            this.time.setMinutes(this.angle / 6);
        }
        if (this.hexClickedColor == this.handsColors[2]) {
            this.time.setHours(this.angle / 30);
        }
    }

    private angleCalcStartAndEnd(x, y) {
        let a1 = (this.ctx.canvas.height / 2 - y) / (this.ctx.canvas.height / 2 - x);
        let a2 = (this.ctx.canvas.height / 2 - (this.ctx.canvas.height) / 2) / (this.ctx.canvas.height / 2 - (this.ctx.canvas.height - 1) / 2)
        let ang = (Math.atan(Math.abs((a1 - a2) / (1 + a1 * a2))) * (180 / Math.PI))

        if (this.mouseSegment == 1 || this.mouseSegment == 3) {
            ang = 90 - ang;
        }

        return this.calculateFinalRadius(ang);
    }

    private calculateFinalRadius(x) {
        return x + (this.mouseSegment - 1) * 90;
    }

    private calculateMouseSegment(x, y) {
        this.previouseMouseSegment = this.mouseSegment;
        if (x > 400 && y < 400) {
            this.mouseSegment = 1;
        }

        if (x <= 400 && y < 400) {
            this.mouseSegment = 4;
        }

        if (x > 400 && y >= 400) {
            this.mouseSegment = 2;
        }

        if (x < 400 && y >= 400) {
            this.mouseSegment = 3;
        }

        if (this.previouseMouseSegment != this.mouseSegment) {
            this.ctx.canvas.dispatchEvent(this.segmentChanged_Event);
        }
    }

    private getCursorPositionOnCanvas(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        return { x: x, y: y };
    }

    private getSecondsAngle() {
        return this.hexClickedColor == this.handsColors[0] ? (this.angle / 6) * (Math.PI / 30) : (this.time.getSeconds() * Math.PI / 30);
    }

    private getMinutesAngle() {
        return this.hexClickedColor == this.handsColors[1] ? (this.angle / 6) * (Math.PI / 30) : ((this.time.getMinutes() + this.time.getSeconds() / 60) * Math.PI / 30);
    }

    private getHoursAngle() {
        return this.hexClickedColor == this.handsColors[2] ? (this.angle / 6) * (Math.PI / 30) : ((this.time.getHours() + this.time.getMinutes() / 60) * Math.PI / 6);
    }
}