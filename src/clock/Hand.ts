export class Hand {

    constructor(private ctx: CanvasRenderingContext2D, private hexColor: string) {

    }

    public draw(pos: number, length: number, width: number) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.hexColor;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(0, 0);
        this.ctx.rotate(pos);
        this.ctx.lineTo(0, -length);
        this.ctx.stroke();
        this.ctx.rotate(-pos);
        return pos;
    }
}

