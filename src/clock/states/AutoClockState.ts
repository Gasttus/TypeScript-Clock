import { BaseClockState } from "./BaseClockState";

export class AutoClockState extends BaseClockState {
    constructor(protected ctx: CanvasRenderingContext2D, protected radius: number, protected time: Date, private hexClickedColor: string) {
        super(ctx, radius);
    }

    public update() {
        this.draw(this.getSecondsAngle(), this.getMinutesAngle(), this.getHoursAngle());
        this.time.setSeconds(this.time.getSeconds() + 1);
    }

    public onDestroy() {

    }

    private getSecondsAngle() {
        return this.time.getSeconds() * Math.PI / 30;
    }

    private getMinutesAngle() {
        return (this.time.getMinutes() + this.time.getSeconds() / 60) * Math.PI / 30;
    }

    private getHoursAngle() {
        return ((this.time.getHours() + this.time.getMinutes() / 60) * Math.PI / 6);
    }
}