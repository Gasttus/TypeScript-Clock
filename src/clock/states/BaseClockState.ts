import { Face } from "../Face";
import { Hand } from "../Hand";

export abstract class BaseClockState {
    protected handsColors = ["#a941f4", "#41e5f4", "#dcf441"];

    constructor(protected ctx: CanvasRenderingContext2D, protected radius: number) {

    }

    public abstract update();
    public abstract onDestroy();

    protected face = new Face(this.ctx, this.radius);
    protected secondsHand = new Hand(this.ctx, this.handsColors[0]);
    protected minutesHand = new Hand(this.ctx, this.handsColors[1]);
    protected hoursHand = new Hand(this.ctx, this.handsColors[2]);

    public draw(secondAngle, minuteAngle, hourAngle) {
        this.face.draw();
        this.secondsHand.draw(secondAngle, this.radius * 0.9, this.radius * 0.02);
        this.minutesHand.draw(minuteAngle, this.radius * 0.8, this.radius * 0.07);
        this.hoursHand.draw(hourAngle, this.radius * 0.5, this.radius * 0.07);
    }
}