export class Face {

    constructor(private ctx: CanvasRenderingContext2D, private radius: number) {

    }

    public draw() {
        this.drawFace();
        this.drawNumbers();
    }

    public drawFace = () => {
        let gradTwo = this.ctx.createRadialGradient(0, 0, this.radius * 0.4, 0, 0, this.radius * 1.05);
        gradTwo.addColorStop(0, "#006600");
        gradTwo.addColorStop(1, "#00cc00");
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = gradTwo;
        this.ctx.fill();

        let gradOne = this.ctx.createRadialGradient(0, 0, this.radius * 0.95, 0, 0, this.radius * 1.05);
        gradOne.addColorStop(0, 'Black');
        gradOne.addColorStop(0.3, '#1f94ad');
        gradOne.addColorStop(0.5, '#33b299');
        this.ctx.strokeStyle = gradOne;
        this.ctx.lineWidth = this.radius * 0.1;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius * 0.1, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#330000';
        this.ctx.fill();
    }

    public drawNumbers = () => {
        let ang;
        let num;
        this.ctx.font = this.radius * 0.15 + "px arial";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "left";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            this.ctx.rotate(ang);
            this.ctx.translate(0, -this.radius * 0.87);
            this.ctx.rotate(-ang);
            this.ctx.fillText(num.toString(), -25, 0);
            this.ctx.rotate(ang);
            this.ctx.translate(0, this.radius * 0.87);
            this.ctx.rotate(-ang);
        }
    }
}